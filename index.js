'use strict';

const jwt = require('jsonwebtoken');
const octokit = require('@octokit/rest');

const { APP_ID, PRIVATE_KEY } = process.env;

const noAppIdMsg = `Provide the \`APP_ID\` env. var.

  In order to be able to authenticate as a GitHub App, the App ID is required. This ID will be used as
  the "issuer claim" in the generated JWT. For more information see:

    https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#authenticating-as-a-github-app

  The App ID can be retrieved after creating the GitHub App from the setting page (in the "About"
  section). For more information see:

    https://developer.github.com/apps/building-github-apps/creating-a-github-app
`;

if (!APP_ID) {
  throw new Error(noAppIdMsg);
}

const noPrivateKeyMsg = `Provide the \`PRIVATE_KEY\` env. var.

  GitHub Apps require a private key to sign access token requests. GitHub allows you to create and
  download private keys in PEM format. For more information see:

    https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#generating-a-private-key

  The \`PRIVATE_KEY\` env. var. expects that the contents of the PEM file are passed as a single string
  with escaped newlines. You can convert your PEM file to a string by running:

    $ awk '$1=$1' ORS='\\n' ./private-key.pem
`;

if (!PRIVATE_KEY) {
  throw new Error(noPrivateKeyMsg);
}

async function _authApp(github, appId, privateKey) {
  const nowInSec = Math.floor(Date.now() / 1e3);
  const payload = {
    iat: nowInSec,
    exp: nowInSec + 60,
    iss: appId
  };

  const cert = privateKey.replace(/\\n/g, '\n');
  const opt = { algorithm: 'RS256' };
  const appToken = jwt.sign(payload, cert, opt);

  github.authenticate({
    type: 'integration',
    token: appToken
  });
}

async function _createInstallation(github) {
  const { data: installs } = await github.apps.getInstallations();
  const [install] = installs;

  const {
    data: { token }
  } = await github.apps.createInstallationToken({ installation_id: install.id });

  github.authenticate({
    type: 'token',
    token
  });

  return install;
}

async function _getBaseCommit(github, repoInfo, branch) {
  let baseCommitSha;

  try {
    const { data: ref } = await github.gitdata.getReference({
      ...repoInfo,
      ref: `heads/${branch.base}`
    });

    const noExactMatch = Array.isArray(ref);

    if (noExactMatch) {
      const error = new Error();

      error.code = 'NO_BASE_BRANCH';

      throw error;
    }

    baseCommitSha = ref.object.sha;
  } catch (err) {
    const noBaseBranch = err.code === 404 || err.code == 'NO_BASE_BRANCH';

    if (noBaseBranch) {
      throw new Error(`Base branch "${baseBranch}" not found.`);
    }

    throw err;
  }

  const { data: commit } = await github.gitdata.getCommit({
    ...repoInfo,
    sha: baseCommitSha
  });

  return {
    sha: baseCommitSha,
    treeSha: commit.tree.sha
  };
}

async function _createCommit(github, repoInfo, baseCommit, commit) {
  const { data: newTree } = await github.gitdata.createTree({
    ...repoInfo,
    tree: JSON.stringify([
      {
        path: commit.path,
        mode: '100644', // file
        type: 'blob',
        content: commit.content
      }
    ]),
    base_tree: baseCommit.treeSha
  });

  const { data: newCommit } = await github.gitdata.createCommit({
    ...repoInfo,
    message: commit.message,
    tree: newTree.sha,
    parents: [baseCommit.sha]
  });

  return newCommit.sha;
}

async function _createPR(github, repoInfo, newCommitSha, branch, pr) {
  await github.gitdata.createReference({
    ...repoInfo,
    sha: newCommitSha,
    ref: `refs/heads/${branch.head}`
  });

  const { data: newPR } = await github.pullRequests.create({
    ...repoInfo,
    head: branch.head,
    base: branch.base,
    title: pr.title,
    body: pr.text,
    maintainer_can_modify: true
  });

  return newPR.html_url;
}

async function run(repo, branch, commit, pr) {
  const github = octokit();

  await _authApp(github, APP_ID, PRIVATE_KEY);

  const installation = await _createInstallation(github);

  const repoInfo = {
    owner: installation.account.login,
    repo: repo.name
  };

  const baseCommit = await _getBaseCommit(github, repoInfo, branch);
  const newCommitSha = await _createCommit(github, repoInfo, baseCommit, commit);
  const prUrl = await _createPR(github, repoInfo, newCommitSha, branch, pr);

  console.log('prUrl: ', prUrl);
}

const repo = {
  name: 'gitops-bot-test'
};

const branch = {
  // The name of the branch you want the changes pulled into.
  base: 'master',

  // The name of the branch where your changes are implemented.
  head: `test-${Date.now()}`
};

const commit = {
  path: 'k8s/deployment.yaml',
  content: `apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: test
  namespace: test
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: test
        version: v1
    spec:
      containers:
      - image: danillouz/docker-say:1.0.0
        name: test
        ports:
        - containerPort: 8888`,
  message: 'I am the Git captain now!'
};

const pr = {
  title: 'Update Config',
  text: 'Kakaa!'
};

run(repo, branch, commit, pr)
  .then(() => {
    console.log('run ok');
  })
  .catch(err => {
    console.log('error: ', err);

    process.exit(1);
  });

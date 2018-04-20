'use strict';

const jwt = require('jsonwebtoken');
const octokit = require('@octokit/rest');

const { APP_ID, PRIVATE_KEY } = process.env;

const noAppIdMsg = `Provide the \`APP_ID\` env. var.

  In order to be able to authenticate as a GitHub App, the App ID is required. This ID will be used as
  the issuer claim in the generated JWT. For more information see:

    https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#authenticating-as-a-github-app

  The App ID can be retrieved after creating the GitHub App, from the setting page, in the "About"
  section. For more information see:

    https://developer.github.com/apps/building-github-apps/creating-a-github-app/
`;

if (!APP_ID) {
  throw new Error(noAppIdMsg);
}

const noPrivateKeyMsg = `Provide the \`PRIVATE_KEY\` env. var.

  GitHub Apps require a private key to sign acces token requests. GitHub allows you to create and
  download private keys in PEM format. For more information see:

    https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#generating-a-private-key

  The \`PRIVATE_KEY\` env. var. expects that the contents of the PEM file are passed as a single string,
  with escaped newlines. You can convert your PEM file to a string by running:

    $ awk '$1=$1' ORS='\\n' ./private-key.pem
`;

if (!PRIVATE_KEY) {
  throw new Error(noPrivateKeyMsg);
}

async function authApp(github, appId, privateKey) {
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

async function authInstallation(github) {
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

async function createCommit(github, repoInfo, filePath, fileContent, commitMsg) {
  const { data: ref } = await github.gitdata.getReference({
    ...repoInfo,
    ref: 'heads/master'
  });

  const lastCommitSha = ref.object.sha;

  const { data: commit } = await github.gitdata.getCommit({
    ...repoInfo,
    sha: lastCommitSha
  });

  const lastTreeSha = commit.tree.sha;

  const treeObjs = [
    {
      path: filePath,
      mode: '100644',
      type: 'blob',
      content: fileContent
    }
  ];

  const { data: newTree } = await github.gitdata.createTree({
    ...repoInfo,
    tree: JSON.stringify(treeObjs),
    base_tree: lastTreeSha
  });

  const { data: newCommit } = await github.gitdata.createCommit({
    ...repoInfo,
    message: commitMsg,
    tree: newTree.sha,
    parents: [lastCommitSha]
  });

  return newCommit.sha;
}

async function createPR(github, repoInfo, newCommitSha, branchName, target, prTitle, prText) {
  await github.gitdata.createReference({
    ...repoInfo,
    sha: newCommitSha,
    ref: `refs/heads/${branchName}`
  });

  const { data: pr } = await github.pullRequests.create({
    ...repoInfo,
    head: branchName,
    base: target,
    title: prTitle,
    body: prText,
    maintainer_can_modify: true
  });

  return pr.html_url;
}

async function run() {
  const github = octokit();

  await authApp(github, APP_ID, PRIVATE_KEY);

  const install = await authInstallation(github);

  const repoInfo = {
    owner: install.account.login,
    repo: 'gitops-bot-test'
  };

  const filePath = 'k8s/deployment.yaml';
  const fileContent = `apiVersion: extensions/v1beta1
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
        - containerPort: 8888`;
  const commitMsg = 'I am the Git captain now!';
  const newCommitSha = await createCommit(github, repoInfo, filePath, fileContent, commitMsg);
  const branchName = `test-${Date.now()}`;
  const target = 'master';
  const prTitle = 'Update Config';
  const prText = 'kakaa!';
  const prUrl = await createPR(github, repoInfo, newCommitSha, branchName, target, prTitle, prText);

  console.log('prUrl: ', prUrl);
}

run()
  .then(() => {
    console.log('run ok');
  })
  .catch(err => {
    console.log('error: ', err);

    process.exit(1);
  });

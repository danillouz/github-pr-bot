'use strict';

const octokit = require('@octokit/rest');
const parseParams = require('./lib/parse-params');
const authApp = require('./lib/auth-app');
const createInstallation = require('./lib/create-installation');
const getBaseCommit = require('./lib/get-base-commit');
const createCommit = require('./lib/create-commit');
const createPR = require('./lib/create-pr');

async function run() {
  const { appId, privateKey, repo, branch, commit, pr } = parseParams(
    process.env
  );

  const github = octokit();

  await authApp(github, appId, privateKey);

  const installation = await createInstallation(github);

  const repoInfo = {
    owner: installation.account.login,
    repo: repo.name
  };

  const baseCommit = await getBaseCommit(github, repoInfo, branch);
  const newCommitSha = await createCommit(github, repoInfo, baseCommit, commit);
  const prUrl = await createPR(github, repoInfo, newCommitSha, branch, pr);

  return prUrl;
}

run()
  .then(pr => {
    console.log(pr);
  })
  .catch(err => {
    console.log(err.message);

    process.exit(1);
  });

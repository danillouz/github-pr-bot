'use strict';

const octokit = require('@octokit/rest');
const parseParams = require('./lib/parse-params');
const authApp = require('./lib/auth-app');
const createInstallation = require('./lib/create-installation');
const getBaseCommit = require('./lib/get-base-commit');
const createCommit = require('./lib/create-commit');
const createPR = require('./lib/create-pr');

async function runWorkflow() {
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
  const newPR = await createPR(github, repoInfo, newCommitSha, branch, pr);

  return newPR;
}

runWorkflow()
  .then(newPR => {
    console.log(newPR);
  })
  .catch(err => {
    console.log(err);

    process.exit(1);
  });

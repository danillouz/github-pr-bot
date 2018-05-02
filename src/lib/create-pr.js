'use strict';

module.exports = async function createPR(
  github,
  repoInfo,
  newCommitSha,
  branch,
  pr
) {
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

  return newPR;
};

'use strict';

module.exports = async function getBaseCommit(github, repoInfo, branch) {
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
      throw new Error(`Base branch "${branch.base}" not found.`);
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
};

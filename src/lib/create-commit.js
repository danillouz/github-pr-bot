'use strict';

module.exports = async function createCommit(
  github,
  repoInfo,
  baseCommit,
  commit
) {
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
    message: commit.msg,
    tree: newTree.sha,
    parents: [baseCommit.sha]
  });

  return newCommit.sha;
};

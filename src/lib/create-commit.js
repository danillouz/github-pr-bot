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

        // @see https://developer.github.com/v3/git/trees/#create-a-tree
        mode: '100644',

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

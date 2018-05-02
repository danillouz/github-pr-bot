'use strict';

const chalk = require('chalk');

const noAppIdMsg = `
${chalk.bold.red('ERROR: Provide the `APP_ID` env. var.')}

  This must contain the ID of the GitHub App you wish to use for this workflow.

  The App ID is required in order to be able to authenticate as a GitHub App and
  is used as the "issuer claim" in the generated JWT. For more information see:
    ${chalk.italic.blue(
      'https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#authenticating-as-a-github-app'
    )}

  The App ID can be retrieved after creating the GitHub App from the settings
  page (in the "About" section). For more information see:
    ${chalk.italic.blue(
      'https://developer.github.com/apps/building-github-apps/creating-a-github-app'
    )}

  Example:
    ${chalk.green("APP_ID='12345'")}
`;

const noPrivateKeyMsg = `
${chalk.bold.red('ERROR: Provide the `PRIVATE_KEY` env. var.')}

  This must contain the private key of the GitHub App you wish to use for this
  workflow.

  GitHub Apps require a private key to sign access token requests. GitHub allows
  you to create and download private keys in PEM format. For more information
  see:
    ${chalk.italic.blue(
      'https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#generating-a-private-key'
    )}

  The easiest way to pass the \`PRIVATE_KEY\` is by loading it from a path.

  Example:
    ${chalk.green('PRIVATE_KEY="$(cat ./private-key.pem)"')}

  If you can't load the private key from a path, you can convert your PEM file
  to a string by running:
    ${chalk.green("$ awk '$1=$1' ORS='\\n' ./private-key.pem")}

  Note that when the \`PRIVATE_KEY\` is passed as a string, the contents of the
  PEM file must be a single string with escaped newlines.

  Example:
    ${chalk.green(
      "PRIVATE_KEY='-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAtyHGso4MKnOStVYItxY+tDF1rY4QNdr34vqH9HfYen5A/wL+\nKczXb75pZ80Skq1M8PmhC2KXHRsBT6GujF2mjCVkjyJRxmLN8JYh8aQFHTS5YxFK\nQMHhbJ7jnPMFr7El7Z5UrsURFGJGSIPdl8/wsLCbrwGBp5OLQy0qPvD6X/WTstHy\ndf6fSfpDEelCdHOfoTDPRishVf9PpCPXFPz6wWUiT8+FDk0bQZVR6+l5mJIPh1l6\nsy8XXUpVn9K5UM6luSeJ3MKkDnQ29kI93wK9p1P4haap+11wDQoAktTc7YVpopOP\nZWQQqsjZilD/d1bmKZl8wbWdgE9KQfGPzE9BhwIDAQABAoIBABzGp+xCudKp2nG4\nFSJ/0laKNw2QdyefQrhd2aMmedO1pwzrMXjsASZD61guNy7pIF/1OcMKOOiP58LV\nixHvXU5ESerb37GmsOmPDcJknZEbSc4xV1OZo4xn4yg0X75dvbH64R+dQ7PKRXT7\nk4RZXl7FQZFcUT09x/JEVJETWKRfNEZ8U/O2/e/npvGBtnz2+1mp/borA1/wM6YL\nM166jhm8jh2t+RVtgDmE1iyJgIi/RAgKV9XjF/LmN/S7fInCUXO0FxVmX32+BKrN\nApklWcuoJn4ZhbJQIppqJDrYqGxgeyYh0K2RjI4G0W6mDEmYKXZ0q1G7wX1cOtIn\nbrWdSqECgYEA3jPp8ymHqIY/u4vEtUGZWLpACWFlBFnyBKfJNhvP1uRkTNoZ6iM5\n51CxLHvT57tfXEuTNKgMtZ+3197m+4CyP7/mtD0jKeP3iE7xY6AeLR6l06PRD/e0\nKB6SnmPWyESfvHZxdNFy2j8g6CapXGZaUjy0E2JGwlVG+7fWt1e6a78CgYEA0vyH\nlRlhZRE/89ThYdPN46Xs3ENR4gts6WHoVz4jObttUrHRFJgUmojN4UobgmU7h9i5\n5ZWG91fk2nRrCeacsP+HdvjuQjrbSUHl+REz8QMjU5x6EztZm/3cS7xrVIWsj9LD\n6sOd1O7tnKH3A5Qh8JXJRs75cMrvC5vl0wKTvDkCgYAzgUcORScbyhqFx20OMqlv\n5qQnSHsY2hx+NcIvF51Ci2gwZDGzkvy+AHdA/2bsBQOiqiXyA64Gf4ImuJVD4N3w\nZvP7/VvkPuJGpz3OwPOds8fuWb+A+wK4dfW4Xx4PB9Ea5z1/PXlo208uYJ/LOjJf\nc5CuGY6bRxcQC9nqX5xnkwKBgQCBrbdD3CKxtQWCv9B7iWxdxIkt5K66ad1aINRm\ncwnBnUKXdjWVG9hmFzm7hAoefkw1te6kfuBCvKIr5yw3HKgoXhaL+Hqw+G35u+g2\nyu0K8KvQ4zdhBLSSHVk+r6OkgrjKeXfznqIu01/2StKBP5YQwm/A9sv4GLMOhpae\nuFHHeQKBgCL+i7BL/yQ/Hyo3PmtRgJq4Gfr/OMTKFF+usjhRA07u0zqZMZT0orUY\nzyZRB4awwlkhsOcjn2aPU/fj6uHg4e6tmsoSTaBbK/PArrN9ClYgeh/zlTj1dI5m\nWW39azEwfga5UnZEJJbNTIt1/Rq7nhW3+73QMCxkeM7mwT8ZfBcN\n-----END RSA PRIVATE KEY-----\n'"
    )}
`;

const noRepoNameMsg = `
${chalk.bold.red('ERROR: Provide the `REPO_NAME` env. var.')}

  This must contain the name of the GitHub repository onto which this workflow
  will be applied to.

  Example:
    ${chalk.green("REPO_NAME='gitops-bot-commit'")}
`;

const noBranchBaseMsg = `
${chalk.bold.red('ERROR: Provide the `BRANCH_BASE` env. var.')}

  This must contain the name of the branch you want the changes pulled into. For
  more information see:
    ${chalk.italic.blue(
      'https://developer.github.com/v3/pulls/#create-a-pull-request'
    )}

  Example:
    ${chalk.green("BRANCH_BASE='master'")}
`;

const noBranchHeadMsg = `
${chalk.bold.red('ERROR: Provide the `BRANCH_HEAD` env. var.')}

  This must contain the name of the branch where the changes will be
  implemented. For more information see:
    ${chalk.italic.blue(
      'https://developer.github.com/v3/pulls/#create-a-pull-request'
    )}

  Example:
    ${chalk.green("BRANCH_HEAD='infra-config-update-1234567890'")}
`;

const noCommitPathMsg = `
${chalk.bold.red('ERROR: Provide the `COMMIT_PATH` env. var.')}

  This must contain the path of the file to be commited. For more information
  see:
    ${chalk.italic.blue(
      'https://developer.github.com/v3/git/trees/#create-a-tree'
    )}

  Example:
    ${chalk.green("COMMIT_PATH='k8s/deployment.yaml'")}
`;

const _contentExample = `apiVersion: extensions/v1beta1
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
          - containerPort: 8888
`;

const noCommitContentMsg = `
${chalk.bold.red('ERROR: Provide the `COMMIT_CONTENT` env. var.')}

  This must contain the new content of the file to be commited, which must contain
  the entire file content. For more information see:
    ${chalk.italic.blue(
      'https://developer.github.com/v3/git/trees/#create-a-tree'
    )}

  Example:
    ${chalk.green("COMMIT_CONTENT='" + _contentExample + "'")}
`;

const noCommitMsgMsg = `
${chalk.bold.red('ERROR: Provide the `COMMIT_MSG` env. var.')}

  This must contain the message that describes the commit. For more information
  see:
    ${chalk.italic.blue(
      'https://developer.github.com/v3/git/commits/#create-a-commit'
    )}

  Example:
    ${chalk.green("COMMIT_MSG='Update infra config with new image'")}
`;

const noPRTitleMsg = `
${chalk.bold.red('ERROR: Provide the `PR_TITLE` env. var.')}

  This must contain the title of the pull request. For more information see:
    ${chalk.italic.blue(
      'https://developer.github.com/v3/git/commits/#create-a-commit'
    )}

  Example:
    ${chalk.green("PR_TITLE='Update Infra Config'")}
`;

const noPRText = `
${chalk.bold.red('ERROR: Provide the `PR_TEXT` env. var.')}

  This must contain the textual body of the pull request. For more information
  see:
    ${chalk.italic.blue(
      'https://developer.github.com/v3/git/commits/#create-a-commit'
    )}

  Example:
    ${chalk.green(
      "PR_TEXT='This commit updates the deployment image to `danillouz/docker-say:1.0.1`.'"
    )}
`;

module.exports = function parseParams({
  APP_ID,
  PRIVATE_KEY,
  REPO_NAME,
  BRANCH_BASE,
  BRANCH_HEAD,
  COMMIT_PATH,
  COMMIT_CONTENT,
  COMMIT_MSG,
  PR_TITLE,
  PR_TEXT
}) {
  if (!APP_ID) {
    throw new Error(noAppIdMsg);
  }

  if (!PRIVATE_KEY) {
    throw new Error(noPrivateKeyMsg);
  }

  if (!REPO_NAME) {
    throw new Error(noRepoNameMsg);
  }

  if (!BRANCH_BASE) {
    throw new Error(noBranchBaseMsg);
  }

  if (!BRANCH_HEAD) {
    throw new Error(noBranchHeadMsg);
  }

  if (!COMMIT_PATH) {
    throw new Error(noCommitPathMsg);
  }

  if (!COMMIT_CONTENT) {
    throw new Error(noCommitContentMsg);
  }

  if (!COMMIT_MSG) {
    throw new Error(noCommitMsgMsg);
  }

  if (!PR_TITLE) {
    throw new Error(noPRTitleMsg);
  }

  if (!PR_TEXT) {
    throw new Error(noPRText);
  }

  return {
    appId: APP_ID,
    privateKey: PRIVATE_KEY,
    repo: {
      name: REPO_NAME
    },
    branch: {
      base: BRANCH_BASE,
      head: BRANCH_HEAD
    },
    commit: {
      path: COMMIT_PATH,
      content: COMMIT_CONTENT,
      msg: COMMIT_MSG
    },
    pr: {
      title: PR_TITLE,
      text: PR_TEXT
    }
  };
};

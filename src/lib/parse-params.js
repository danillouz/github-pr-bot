'use strict';

const noAppIdMsg = `Provide the \`APP_ID\` env. var.

  This must contain the ID of the GitHub App you wish to use for this workflow.

  The App ID is required in order to be able to authenticate as a GitHub App and
  is used as the "issuer claim" in the generated JWT. For more information see:
    https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#authenticating-as-a-github-app

  The App ID can be retrieved after creating the GitHub App from the settings
  page (in the "About" section). For more information see:
    https://developer.github.com/apps/building-github-apps/creating-a-github-app

  Example:
    APP_ID='12345'
`;

const noPrivateKeyMsg = `Provide the \`PRIVATE_KEY\` env. var.

  This must contain the private key of the GitHub App you wish to use for this
  workflow.

  GitHub Apps require a private key to sign access token requests. GitHub allows
  you to create and download private keys in PEM format. For more information
  see:
    https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#generating-a-private-key

  The \`PRIVATE_KEY\` env. var. expects that the contents of the PEM file are
  passed as a single string with escaped newlines. You can convert your PEM file
  to a string by running:
    $ awk '$1=$1' ORS='\\n' ./private-key.pem

  Example:
    PRIVATE_KEY='-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAziG4WKpidTSt6VUixRGfoAXrfmqH/SykUwo2+fNtrE2G+OQC\nipZhi9elapw19YFUDM9wW4iquqyE6B9j5+dDQLwOfx1fI1WG6UOflM30teXdEKsN\nxL8fzq6q16og+zZSVXnenXORVSEAROvVWNQvs3bBOywLQEQKFoykYpH+Oap8wai8\n4Qh05rj7KJitl2GbScVBDcZK6aWsr4RhSnzxiJZPFOOsOtm6JRtcHaPXByHURjeY\nif9lCLGSTU6Cx1z6UfYJYtnI5KWpiK06RyaLvjq7Qkf9jHn9Q6cDISwe7/3eEjBV\n7UTnOkCIOUh4pGaLPZkKpBTX+Kr5zEdpCGFOuQIDAQABAoIBAQCIrYUtjXSRYKe8\nIo5We1QLaEF45ixbbAFdalV/sLBU4mcPmygwOnxdnFR7dy60JdfUUqueleUWuBO8\nUiwNdaN7RfaaxJ/zrt8wxn0GzvVmsw684Z7UiSIPCnQPYihSSfeX46H/ZsTD3Ijw\nKiuhpbgnWCPSF2cyaqsBvqm1Djayhq764LbmUqhggC2wbwoKmGVFW+uAeU0uepk5\nMQ91xu67O58c9GvvlGoicURaegtzmn1MZXGohI5bxy5ZeAQwx7hadu/96KupJTtQ\nXooe5QJS+rXOxr3/ZfPVXN1q1Pcfo35shAGAoT7hiJJEDZ6IqSjrSjmRHF5BhAyh\nJkGTzu2xAoGBAPIILbkIo+WELLEpSEGgcafYQ3MphWbAwgmooEWHgmq+wxh0+/aX\nEkWrZCYFmGa2zZfEqvCOskY6MGKAj5/YUTkNub4KYoSgCwRHN6i4K1v6v21cnuGX\nNUnqI9K4UTDPVxzEIsM7VaKfonUR8bVKdWNFybHwDf/BCoFdttJeiSZtAoGBANoH\nJTe0cpa067N2h3K8Vd/i3o4tLmOgu/St9OBwTkcsvEPq5XWyezsmRWI4XHdPBALf\no3dlxVF39d88BX5xlqZcThg9oLalUduOijnZNv+G5BXnnPsMnYOkKTiBfV+BTcrd\nvdeSFqu/YCdzbgGQ7ox/c+8w00Vzo2E7Ot+2non9AoGANiigWpxVWIGIIqiTM6Q8\naouZJEbxQ/n0MYcbPhPBmjNPosRisV5Cx3Y/tcZgwPM89C4c9jFoMRDKTPBpsyIL\notGwc5cNTpIlhPKOwOFdSnrEpSspnl9gnEaZd4ipGlv7KUO2Z6t6USaZisrWJHQh\n6nHuXTPTXhyLRkF7LH3dAM0CgYA8zA9JyEzHz62GPsAoc3Iy202aMekkqPaglT2a\ntFZvrH7XJZJUzq9kYBiq+fJ25pbEwl4P9lYekKgEVvVlPAF5ZHX2doDxTYpVAhtz\nZCnc+V1y6kIxE2R9B/LiqeEvF5x8vHaqvTcLL3N9rMd5mlQC46uNgHz5efSOMXkK\nVx9AdQKBgQCOM5+635CsiGxehH+YbO1PpAIc0BCXKMwatLeLHkhqxUgVgrG2Diru\nTewEHzWdO7RpvE0203AA4pDB+E9tWKx/+50l7Bd4z99a+MX8wFWqNByVzQIfzmxc\n6F/ttF3n6pQ+ftGt+TSye3zruS0Hu7xHw9xQwb6zvGQJ+50piPtELq\n-----END RSA PRIVATE KEY-----\n'
`;

const noRepoNameMsg = `Provide the \`REPO_NAME\` env. var.

  This must contain the name of the GitHub repository.

  Example:
    REPO_NAME='gitops-bot-commit'
`;

const noBranchBaseMsg = `Provide the \`BRANCH_BASE\` env. var.

  This must contain the name of the branch you want the changes pulled into. For
  more information see:
    https://developer.github.com/v3/pulls/#create-a-pull-request

  Example:
    BRANCH_BASE='master'
`;

const noBranchHeadMsg = `Provide the \`BRANCH_HEAD\` env. var.

  This must contain the name of the branch where your changes will be
  implemented. For more information see:
    https://developer.github.com/v3/pulls/#create-a-pull-request

  Example:
    BRANCH_HEAD='infra-config-update-1234567890'
`;

const noCommitPathMsg = `Provide the \`COMMIT_PATH\` env. var.

  This must contain the path of the file to be commited. For more information
  see:
    https://developer.github.com/v3/git/trees/#create-a-tree

  Example:
    COMMIT_PATH='k8s/deployment.yaml'
`;

const noCommitContentMsg = `Provide the \`COMMIT_CONTENT\` env. var.

  This must contain the new content you want the file to be commited have and must
  contain the entire file content. For more information see:
    https://developer.github.com/v3/git/trees/#create-a-tree

  Example:
    COMMIT_CONTENT='apiVersion: extensions/v1beta1
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
            - containerPort: 8888'
`;

const noCommitMsgMsg = `Provide the \`COMMIT_MSG\` env. var.

  This must contain the message that describes your commit. For more information
  see:
    https://developer.github.com/v3/git/commits/#create-a-commit

  Example:
    COMMIT_MSG='Update infra config with new Docker image tag'
`;

const noPRTitleMsg = `Provide the \`PR_TITLE\` env. var.

  This must contain the title of the pull request. For more information see:
    https://developer.github.com/v3/git/commits/#create-a-commit

  Example:
    PR_TITLE='Update Infra Config'
`;

const noPRText = `Provide the \`PR_TEXT\` env. var.

  This must contain the textual body of the pull request. For more information
  see:
    https://developer.github.com/v3/git/commits/#create-a-commit

  Example:
    PR_TEXT='This PR updates the infra config with a new Docker image.'
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

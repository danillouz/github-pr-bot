# GitHub Pull Request Bot

Commit a single file and send a pull request.

_It requires a [GitHub App](https://developer.github.com/apps/getting-started-with-building-apps/#using-github-apps) to be configured._

## How

The bot creates a new commit from a _base_ on a separate branch, i.e. _head_.
It then creates a pull request that will pull in the changes from the head branch,
e.g. `feature-a`, to the base branch, e.g. `master`.

## Configuration

The bot is configured with environment variables:

| VARIABLE NAME    | DESCRIPTION                                                                                                                                                                                                                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APP_ID`         | The ID of the GitHub App you wish to use for this workflow. The App ID can be retrieved after creating the GitHub App from the settings page (in the "About" section). More information can be found [here](https://developer.github.com/apps/building-github-apps/creating-a-github-app).                                                                                |
| `PRIVATE_KEY`    | The private key of the GitHub App you wish to use for this workflow. GitHub Apps require a private key to sign access token requests. GitHub allows you to create and download private keys in PEM format. More information can be found [here](https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#generating-a-private-key). |
| `REPO_NAME`      | The name of the GitHub repository onto which this workflow will be applied to.                                                                                                                                                                                                                                                                                            |
| `BRANCH_BASE`    | The name of the branch you want the changes pulled into. More information can be found [here](https://developer.github.com/v3/pulls/#create-a-pull-request).                                                                                                                                                                                                              |
| `BRANCH_HEAD`    | The name of the branch where the changes will be implemented. More information can be found [here](https://developer.github.com/v3/pulls/#create-a-pull-request).                                                                                                                                                                                                         |
| `COMMIT_PATH`    | The path of the file to be commited. More information can be found [here](https://developer.github.com/v3/git/trees/#create-a-tree).                                                                                                                                                                                                                                      |
| `COMMIT_CONTENT` | The new content of the file to be commited and must contain the entire file content. More information can be found [here](https://developer.github.com/v3/git/trees/#create-a-tree).                                                                                                                                                                                      |
| `COMMIT_MSG`     | The message that describes the commit. More information can be found [here](https://developer.github.com/v3/git/commits/#create-a-commit).                                                                                                                                                                                                                                |
| `PR_TITLE`       | The title of the pull request. More information can be found [here](https://developer.github.com/v3/git/commits/#create-a-commit).                                                                                                                                                                                                                                        |
| `PR_TEXT`        | The textual body of the pull request. More information can be found [here](https://developer.github.com/v3/git/commits/#create-a-commit).                                                                                                                                                                                                                                 |

_All are required for the worflow to execute._

## Example NodeJS

```sh
APP_ID='12345' \
PRIVATE_KEY='-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAtyHGso4MKnOStVYItxY+tDF1rY4QNdr34vqH9HfYen5A/wL+\nKczXb75pZ80Skq1M8PmhC2KXHRsBT6GujF2mjCVkjyJRxmLN8JYh8aQFHTS5YxFK\nQMHhbJ7jnPMFr7El7Z5UrsURFGJGSIPdl8/wsLCbrwGBp5OLQy0qPvD6X/WTstHy\ndf6fSfpDEelCdHOfoTDPRishVf9PpCPXFPz6wWUiT8+FDk0bQZVR6+l5mJIPh1l6\nsy8XXUpVn9K5UM6luSeJ3MKkDnQ29kI93wK9p1P4haap+11wDQoAktTc7YVpopOP\nZWQQqsjZilD/d1bmKZl8wbWdgE9KQfGPzE9BhwIDAQABAoIBABzGp+xCudKp2nG4\nFSJ/0laKNw2QdyefQrhd2aMmedO1pwzrMXjsASZD61guNy7pIF/1OcMKOOiP58LV\nixHvXU5ESerb37GmsOmPDcJknZEbSc4xV1OZo4xn4yg0X75dvbH64R+dQ7PKRXT7\nk4RZXl7FQZFcUT09x/JEVJETWKRfNEZ8U/O2/e/npvGBtnz2+1mp/borA1/wM6YL\nM166jhm8jh2t+RVtgDmE1iyJgIi/RAgKV9XjF/LmN/S7fInCUXO0FxVmX32+BKrN\nApklWcuoJn4ZhbJQIppqJDrYqGxgeyYh0K2RjI4G0W6mDEmYKXZ0q1G7wX1cOtIn\nbrWdSqECgYEA3jPp8ymHqIY/u4vEtUGZWLpACWFlBFnyBKfJNhvP1uRkTNoZ6iM5\n51CxLHvT57tfXEuTNKgMtZ+3197m+4CyP7/mtD0jKeP3iE7xY6AeLR6l06PRD/e0\nKB6SnmPWyESfvHZxdNFy2j8g6CapXGZaUjy0E2JGwlVG+7fWt1e6a78CgYEA0vyH\nlRlhZRE/89ThYdPN46Xs3ENR4gts6WHoVz4jObttUrHRFJgUmojN4UobgmU7h9i5\n5ZWG91fk2nRrCeacsP+HdvjuQjrbSUHl+REz8QMjU5x6EztZm/3cS7xrVIWsj9LD\n6sOd1O7tnKH3A5Qh8JXJRs75cMrvC5vl0wKTvDkCgYAzgUcORScbyhqFx20OMqlv\n5qQnSHsY2hx+NcIvF51Ci2gwZDGzkvy+AHdA/2bsBQOiqiXyA64Gf4ImuJVD4N3w\nZvP7/VvkPuJGpz3OwPOds8fuWb+A+wK4dfW4Xx4PB9Ea5z1/PXlo208uYJ/LOjJf\nc5CuGY6bRxcQC9nqX5xnkwKBgQCBrbdD3CKxtQWCv9B7iWxdxIkt5K66ad1aINRm\ncwnBnUKXdjWVG9hmFzm7hAoefkw1te6kfuBCvKIr5yw3HKgoXhaL+Hqw+G35u+g2\nyu0K8KvQ4zdhBLSSHVk+r6OkgrjKeXfznqIu01/2StKBP5YQwm/A9sv4GLMOhpae\nuFHHeQKBgCL+i7BL/yQ/Hyo3PmtRgJq4Gfr/OMTKFF+usjhRA07u0zqZMZT0orUY\nzyZRB4awwlkhsOcjn2aPU/fj6uHg4e6tmsoSTaBbK/PArrN9ClYgeh/zlTj1dI5m\nWW39azEwfga5UnZEJJbNTIt1/Rq7nhW3+73QMCxkeM7mwT8ZfBcN\n-----END RSA PRIVATE KEY-----\n' \
REPO_NAME='my-repo' \
BRANCH_BASE='master' \
BRANCH_HEAD='update-config-1234567890' \
COMMIT_PATH='k8s/deployment.yaml' \
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
      - image: danillouz/docker-say:1.0.1
        name: test
        ports:
        - containerPort: 8888' \
COMMIT_MSG='Update infra config with new image' \
PR_TITLE='Update Infra Config' \
PR_TEXT='This commit updates the deployment image to `danillouz/docker-say:1.0.1`.' \
node src/index.js
```

_The private key is not active and just serves for example purposes._

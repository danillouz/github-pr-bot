# gitops-bot-commit

```sh
APP_ID='11266' \
PRIVATE_KEY='-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAtyHGso4MKnOStVYItxY+tDF1rY4QNdr34vqH9HfYen5A/wL+\nKczXb75pZ80Skq1M8PmhC2KXHRsBT6GujF2mjCVkjyJRxmLN8JYh8aQFHTS5YxFK\nQMHhbJ7jnPMFr7El7Z5UrsURFGJGSIPdl8/wsLCbrwGBp5OLQy0qPvD6X/WTstHy\ndf6fSfpDEelCdHOfoTDPRishVf9PpCPXFPz6wWUiT8+FDk0bQZVR6+l5mJIPh1l6\nsy8XXUpVn9K5UM6luSeJ3MKkDnQ29kI93wK9p1P4haap+11wDQoAktTc7YVpopOP\nZWQQqsjZilD/d1bmKZl8wbWdgE9KQfGPzE9BhwIDAQABAoIBABzGp+xCudKp2nG4\nFSJ/0laKNw2QdyefQrhd2aMmedO1pwzrMXjsASZD61guNy7pIF/1OcMKOOiP58LV\nixHvXU5ESerb37GmsOmPDcJknZEbSc4xV1OZo4xn4yg0X75dvbH64R+dQ7PKRXT7\nk4RZXl7FQZFcUT09x/JEVJETWKRfNEZ8U/O2/e/npvGBtnz2+1mp/borA1/wM6YL\nM166jhm8jh2t+RVtgDmE1iyJgIi/RAgKV9XjF/LmN/S7fInCUXO0FxVmX32+BKrN\nApklWcuoJn4ZhbJQIppqJDrYqGxgeyYh0K2RjI4G0W6mDEmYKXZ0q1G7wX1cOtIn\nbrWdSqECgYEA3jPp8ymHqIY/u4vEtUGZWLpACWFlBFnyBKfJNhvP1uRkTNoZ6iM5\n51CxLHvT57tfXEuTNKgMtZ+3197m+4CyP7/mtD0jKeP3iE7xY6AeLR6l06PRD/e0\nKB6SnmPWyESfvHZxdNFy2j8g6CapXGZaUjy0E2JGwlVG+7fWt1e6a78CgYEA0vyH\nlRlhZRE/89ThYdPN46Xs3ENR4gts6WHoVz4jObttUrHRFJgUmojN4UobgmU7h9i5\n5ZWG91fk2nRrCeacsP+HdvjuQjrbSUHl+REz8QMjU5x6EztZm/3cS7xrVIWsj9LD\n6sOd1O7tnKH3A5Qh8JXJRs75cMrvC5vl0wKTvDkCgYAzgUcORScbyhqFx20OMqlv\n5qQnSHsY2hx+NcIvF51Ci2gwZDGzkvy+AHdA/2bsBQOiqiXyA64Gf4ImuJVD4N3w\nZvP7/VvkPuJGpz3OwPOds8fuWb+A+wK4dfW4Xx4PB9Ea5z1/PXlo208uYJ/LOjJf\nc5CuGY6bRxcQC9nqX5xnkwKBgQCBrbdD3CKxtQWCv9B7iWxdxIkt5K66ad1aINRm\ncwnBnUKXdjWVG9hmFzm7hAoefkw1te6kfuBCvKIr5yw3HKgoXhaL+Hqw+G35u+g2\nyu0K8KvQ4zdhBLSSHVk+r6OkgrjKeXfznqIu01/2StKBP5YQwm/A9sv4GLMOhpae\nuFHHeQKBgCL+i7BL/yQ/Hyo3PmtRgJq4Gfr/OMTKFF+usjhRA07u0zqZMZT0orUY\nzyZRB4awwlkhsOcjn2aPU/fj6uHg4e6tmsoSTaBbK/PArrN9ClYgeh/zlTj1dI5m\nWW39azEwfga5UnZEJJbNTIt1/Rq7nhW3+73QMCxkeM7mwT8ZfBcN\n-----END RSA PRIVATE KEY-----\n' \
REPO_NAME='gitops-bot-test' \
BRANCH_BASE='master' \
BRANCH_HEAD='test-03' \
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
      - image: danillouz/docker-say:latest
        name: test
        ports:
        - containerPort: 8888' \
COMMIT_MSG='Update infra config with new Docker image tag' \
PR_TITLE='Update Infra Config' \
PR_TEXT='kakaa!' \
node src/index.js
```

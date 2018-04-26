'use strict';

module.exports = async function createInstallation(github) {
  const { data: installations } = await github.apps.getInstallations();
  const [installation] = installations;

  const {
    data: { token }
  } = await github.apps.createInstallationToken({
    installation_id: installation.id
  });

  github.authenticate({
    type: 'token',
    token
  });

  return installation;
};

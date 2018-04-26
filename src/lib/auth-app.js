'use strict';

const jwt = require('jsonwebtoken');

module.exports = async function authApp(github, appId, privateKey) {
  const nowInSec = Math.floor(Date.now() / 1e3);
  const payload = {
    iat: nowInSec,
    exp: nowInSec + 60,
    iss: appId
  };

  const cert = privateKey.replace(/\\n/g, '\n');
  const opt = { algorithm: 'RS256' };
  const appToken = jwt.sign(payload, cert, opt);

  github.authenticate({
    type: 'integration',
    token: appToken
  });
};

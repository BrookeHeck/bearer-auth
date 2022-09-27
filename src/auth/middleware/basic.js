'use strict';

const base64 = require('base-64');
const { users } = require('./../models');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { throw new Error('No username or password') }

    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, pass] = decodedString.split(':'); // username, password

    req.user = await users.authenticateBasic(username, pass);
    console.log(req.user);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}

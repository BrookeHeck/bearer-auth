'use strict';

const base64 = require('base-64');
const { user } = require('./../models');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { throw new Error('No username or password') }

    let basic = req.headers.authorization;
    console.log(req.headers.authorization);
    let [username, pass] = base64.decode(basic).split(':');

    req.user = await user.authenticateBasic(username, pass)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}

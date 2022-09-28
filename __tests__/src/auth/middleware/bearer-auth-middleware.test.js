'use strict';

const bearer = require('./../../../../src/auth/middleware/bearer');
const { db, users } = require('./../../../../src/auth/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const API_SECRET = process.env.API_SECRET || 'CHANGE_ME';

let userInfo = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await db.sync();
  await users.create(userInfo.admin);
});
afterAll(async () => {
  await db.drop();
});

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
    json: jest.fn(() => res),
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

      return bearer(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    });

    it('logs in a user with a proper token', async () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, API_SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      await bearer(req, res, next);
      expect(next).toHaveBeenCalledWith();

    });
  });
});
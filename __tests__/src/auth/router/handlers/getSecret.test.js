'use strict';

const { db, } = require('./../../../../../src/auth/models');
const { handleSecret } = require('./../../../../../src/auth/router/handlers');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});


describe('testing the users route handler', () => {

  const res = {
    send: jest.fn(() => res),
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  }
  const next = jest.fn();

  test('Should respond with a secret response', () => {
    let req = {};

    handleSecret(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.anything());
  });
});
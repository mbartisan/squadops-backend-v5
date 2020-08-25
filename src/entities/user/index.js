import libMD5 from 'js-md5';
import libUUIDv4 from 'uuid/v4.js';
import lib_bcrypt from 'bcrypt-nodejs';

import crypto from 'crypto';

import buildMakeUser from './user.js';
import buildMakeUserLinkedAccount from './user-linked-account.js';
import buildMakeUserCredential from './user-credential.js';

const makeUser = buildMakeUser({ md5, uuid });
const makeUserLinkedAccount = buildMakeUserLinkedAccount();
const makeUserCredential = buildMakeUserCredential({ hashToken, generateToken });

function generateToken() {
  return uuid();
}

function hashToken(input) {
  return sha256(input, 'base64');
}

function validateHashedToken(rawToken, hashedToken) {
  return hashToken(rawToken) === hashedToken;
}

function hashPassword(password) {
  return hashString(password, 10);
}

function validateHashedPassword(rawPassword, hashedPassword) {
  return validateHashedString(rawPassword, hashedPassword);
}

function md5(str) {
  return libMD5(str);
}

function uuid() {
  return libUUIDv4();
}

function sha256(input, encoding = 'hex') {
  return crypto.createHash('sha256').update(input).digest(encoding);
}

function hashString(input, rounds = 8) {
  return new Promise((resolve, reject) => {
    lib_bcrypt.genSalt(rounds, (err, salt) => {
      if (err) return reject(err);
      lib_bcrypt.hash(input, salt, null, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
}

function validateHashedString(rawString, hashedString) {
  return new Promise((resolve, reject) => {
    lib_bcrypt.compare(rawString, hashedString, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

export {
  makeUser,
  makeUserLinkedAccount,
  makeUserCredential,
  generateToken,
  hashToken,
  validateHashedToken,
  hashPassword,
  validateHashedPassword,
};

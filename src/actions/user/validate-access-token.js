import { makeUserCredential, hashToken } from '../../entities/user/index.js';

export default function makeValidateAccessToken({ db }) {
  return async function validateAccessToken(token) {
    const hashedData = hashToken(token);
    const cred = await db.users.credentials.query.findOne({ type: 'access_token', hashedData });
    if (!cred) throw new Error('Invalid access token.');

    if (makeUserCredential(cred).isExpired()) throw new Error('Access token is expired.');

    return cred.userId;
  };
}

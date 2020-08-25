import { hashToken } from '../../entities/user/index.js';

export default function makeRemoveAccessToken({ db }) {
  return async function removeAccessToken({ rawToken, hashedToken }) {
    if (rawToken) hashedToken = hashToken(rawToken);

    if (!hashedToken) throw new Error('Hashed token was null. Either provide the rawToken to be hashed, or provided the hashedToken.');

    const cred = await db.users.credentials.query.deleteWhere({
      type: 'access_token',
      hashedData: hashedToken,
    });

    return cred;
  };
}

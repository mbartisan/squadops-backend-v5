import { validateHashedPassword } from '../../entities/user/index.js';

export default function makeValidateLogin({ db, createAccessToken }) {
  return async function validateLogin({ userId, email, password }) {
    if (!userId) {
      const user = await db.users.users.query.findOne({ email });
      if (!user) throw new Error(`Could not find an account with the email ${email}`);
      userId = user.id;
    }

    // if (!userId) throw new Error('You must provide the userId or email for the user.');

    const cred = await db.users.credentials.query.findOne({ userId, type: 'password' });
    if (!cred) throw new Error(`Could not find a password credential for the user id ${userId}`);

    const valid = await validateHashedPassword(password, cred.hashedData);

    const output = {
      valid,
      userId,
    };

    output.accessToken = (await createAccessToken({ userId })).accessToken;

    return output;
  };
}

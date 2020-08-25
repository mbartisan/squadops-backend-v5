export default function makeRetrieveUserLinkedAccount({ db }) {
  return async function retrieveUserLinkedAccount(userId, key) {
    const linkedAccount = await db.users.linkedAccounts.query.findOne({ userId, key });
    return linkedAccount;
  };
}

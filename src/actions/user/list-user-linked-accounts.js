export default function makeListUserLinkedAccounts({ db }) {
    return async function listUserLinkedAccounts(searchParameters) {
        return await db.users.linkedAccounts.query.findAll(searchParameters);
    }
}

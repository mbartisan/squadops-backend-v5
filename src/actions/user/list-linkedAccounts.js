export default function makeListLinkedAccounts({ usersDb }) {
    return async function listLinkedAccounts(searchParameters) {
        console.log(searchParameters);
        return await usersDb.linkedAccounts.query.findAll(searchParameters);
    }
}

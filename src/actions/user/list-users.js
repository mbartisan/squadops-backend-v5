export default function makeListUsers({ usersDb }) {
    return async function listUsers(searchParameters) {
        return await usersDb.users.query.findAll(searchParameters);
    }
}

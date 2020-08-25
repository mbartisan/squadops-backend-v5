export default function makeListUsers({ db }) {
  return async function listUsers(searchParameters) {
    return await db.users.users.query.findAll(searchParameters);
  };
}

export default function makeListOrgRoles({ db }) {
  return async function listOrgRoles(searchParameters) {
    return await db.orgs.roles.query.findAll(searchParameters);
  };
}

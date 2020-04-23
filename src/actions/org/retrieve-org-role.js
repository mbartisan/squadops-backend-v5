export default function makeRetrieveOrgRole({ db }) {
    return async function retrieveOrgRole(roleId) {
       const role = await db.orgs.roles.query.findOne({ id: roleId });
        return role;
    }
}

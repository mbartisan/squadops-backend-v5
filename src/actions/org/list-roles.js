export default function makeListRoles({ orgsDb }) {
    return async function listRoles(searchParameters) {
        const roles = (await orgsDb.roles.query.findAll(searchParameters));
        const roleIds = roles.map(({id})=>(id));
        const [
            roleUsers,
        ] = await Promise.all([
            orgsDb.roleUsers.query.findAll({ roleId: roleIds, orgId: searchParameters.orgId }),
        ]);
        return roles.map(t => ({
            ...t,
            users: roleUsers.filter(tu => tu.roleId === t.id).map(({userId})=>userId)
        }));
    }
}

export default function makeListUsers({ orgsDb, usersDb }) {
    return async function listUsers(searchParameters) {
        const scopeUsers = (await orgsDb.orgUsers.query.findAll(searchParameters));
        const userIds = scopeUsers.map(({userId})=>(userId));
        const [
            users,
            teamUsers,
            roleUsers,
        ] = await Promise.all([
            usersDb.users.query.findAll({ id: userIds }),
            orgsDb.teamUsers.query.findAll({ userId: userIds, orgId: searchParameters.orgId }),
            orgsDb.roleUsers.query.findAll({ userId: userIds, orgId: searchParameters.orgId }),
        ]);
        const [
            teams,
            roles
        ] = await Promise.all([
            orgsDb.teams.query.findAll({ id: teamUsers.map(({teamId})=>teamId)}),
            orgsDb.roles.query.findAll({ id: roleUsers.map(({roleId})=>roleId)}),
        ]);
        return users.map(u => ({
            ...u,
            addedAt: scopeUsers.find(ou => ou.userId === u.id).createdAt,
            teams: teams.filter(t => (teamUsers.findIndex(tu => tu.teamId === t.id && tu.userId === u.id) !== -1)).map(({id})=>id),
            roles: roles.filter(r => (roleUsers.findIndex(ru => ru.roleId === r.id && ru.userId === u.id) !== -1)).map(({id})=>id)
        }));
    }
}

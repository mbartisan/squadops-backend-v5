export default function makeListTeams({ orgsDb }) {
    return async function listTeams(searchParameters) {
        const teams = (await orgsDb.teams.query.findAll(searchParameters));
        const teamIds = teams.map(({id})=>(id));
        const [
            teamUsers,
        ] = await Promise.all([
            orgsDb.teamUsers.query.findAll({ teamId: teamIds, orgId: searchParameters.orgId }),
        ]);
        return teams.map(t => ({
            ...t,
            users: teamUsers.filter(tu => tu.teamId === t.id).map(({userId})=>userId)
        }));
    }
}

export default function makeRetrieveOrgTeam({ db }) {
    return async function retrieveOrgTeam(teamId) {
       const team = await db.orgs.teams.query.findOne({ id: teamId });
        return team;
    }
}

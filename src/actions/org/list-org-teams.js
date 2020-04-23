export default function makeListOrgTeams({ db }) {
    return async function listOrgTeams(searchParameters) {
        return await db.orgs.teams.query.findAll(searchParameters);
    }
}

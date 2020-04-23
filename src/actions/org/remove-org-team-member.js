export default function makeRemoveOrgTeamMember({ db }) {
    return async function removeOrgTeamMember({ teamId, userId }) {

        const exists = await db.orgs.teams.members.query.findOne({ teamId, userId });
        if (!exists) throw new Error("OrgTeamMember does not exist.");

        return db.orgs.teams.members.query.deleteWhere({ teamId, userId });
    }
}

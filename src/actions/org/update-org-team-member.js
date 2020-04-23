import {makeOrgTeamMember} from "../../entities/org/index.js";
export default function makeUpdateOrgTeamMember({ db }) {
    return async function updateOrgTeamMember({ teamId, userId, ...changes } = {}) {
        if (!teamId) throw new Error('You must supply an teamId.');
        if (!userId) throw new Error('You must supply an userId.');

        const existing = await db.orgs.teams.members.query.findOne({ teamId, userId });
        if (!existing) throw new RangeError('OrgMember not found.');

        const orgMember = makeOrgTeamMember({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await db.orgs.teams.members.query.updateWhere({
            isLeader: orgMember.getIsLeader(),
            updatedAt: orgMember.getUpdatedAt()
        }, {
            teamId: orgMember.getTeamId(),
            userId: orgMember.getUserId()
        });
        return { ...updated }
    }
}

import {makeTeamUser} from "../../entities/org/index.js";
export default function makeEditTeamUser({ orgsDb }) {
    return async function editTeamUser({ teamId, userId, ...changes } = {}) {
        if (!teamId) throw new Error('You must supply the teamId.');
        if (!userId) throw new Error('You must supply the userId.');

        const existing = await orgsDb.teamUsers.findOne({ teamId, userId });
        if (!existing) throw new RangeError('TeamUser not found.');

        const teamUser = makeTeamUser({ ...existing, ...changes });

        const [updated] = await orgsDb.teamUsers.query.updateWhere({
            isLeader: teamUser.getIsLeader(),
            updatedAt: teamUser.getUpdatedAt(),
        }, {
            teamId: teamUser.getTeamId(),
            userId: teamUser.getUserId(),
        });
        return { ...updated }
    }
}

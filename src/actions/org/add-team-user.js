import {makeTeamUser} from "../../entities/org/index.js";
export default function makeAddTeamUser({ orgsDb }) {
    return async function addTeamUser(teamUserData) {
        const teamUser = makeTeamUser(teamUserData);

        const exists = await orgsDb.teamUsers.query.findOne({ teamId: teamUser.getTeamId(), userId: teamUser.getUserId() });
        if (exists) throw new Error("TeamUser already exists.");

        return orgsDb.teamUsers.query.insert({
            teamId: teamUser.getTeamId(),
            userId: teamUser.getUserId(),
            orgId: teamUser.getOrgId(),
            isLeader: teamUser.getIsLeader(),
            createdAt: teamUser.getCreatedAt(),
            updatedAt: teamUser.getUpdatedAt(),
        });
    }
}

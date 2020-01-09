export default function buildMakeTeamUser () {
    return function makeTeamUser (
        {
            teamId,
            userId,
            orgId,
            isLeader = 0,
            createdAt = ((Date.now() / 1000).toFixed()),
            updatedAt = ((Date.now() / 1000).toFixed()),
        } = {}) {
        if (!teamId) {
            throw new Error("TeamUser must have a teamId.");
        }
        if (!userId) {
            throw new Error("TeamUser must have a userId.");
        }
        if (!orgId) {
            throw new Error("TeamUser must have a orgId.");
        }

        return Object.freeze({
            getTeamId: () => teamId,
            getUserId: () => userId,
            getOrgId: () => orgId,
            getIsLeader: () => isLeader,
            isLeader: () => isLeader,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000)
        });

    };
}

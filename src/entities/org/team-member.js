export default function buildMakeOrgTeamMember () {
    return function makeOrgTeamMember (
        {
            teamId,
            userId,
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

        return Object.freeze({
            getTeamId: () => teamId,
            getUserId: () => userId,
            getIsLeader: () => isLeader,
            setIsLeader: (val) => {
                isLeader = val;
            },
            isLeader: () => isLeader === 1 || isLeader === true,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000)
        });

    };
}

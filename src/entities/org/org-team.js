export default function buildMakeOrgTeam () {
    return function makeOrgTeam (
        {
            id,
            orgId,
            name,
            color,
            icon,
            createdAt = ((Date.now() / 1000).toFixed()),
            updatedAt = ((Date.now() / 1000).toFixed()),
        } = {}) {

        if (!name) {
            throw new Error("Team must have a name.");
        }
        name = name.trim();
        if (!orgId) {
            throw new Error("Team must have an orgId.");
        }

        return Object.freeze({
            getId: () => id,
            getOrgId: () => orgId,
            getName: () => name,
            getColor: () => color,
            getIcon: () => icon,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000)
        });

    };
}

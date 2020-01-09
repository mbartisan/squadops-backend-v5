export default function buildMakeOrgUser () {
    return function makeOrgUser (
        {
            orgId,
            userId,
            createdAt = ((Date.now() / 1000).toFixed())
        } = {}) {
        if (!orgId) {
            throw new Error("OrgUser must have a orgId.");
        }
        if (!userId) {
            throw new Error("OrgUser must have a userId.");
        }

        return Object.freeze({
            getOrgId: () => orgId,
            getUserId: () => userId,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000)
        });

    };
}

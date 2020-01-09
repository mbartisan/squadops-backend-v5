export default function buildMakeRoleUser () {
    return function makeRoleUser (
        {
            roleId,
            userId,
            orgId,
            createdAt = ((Date.now() / 1000).toFixed())
        } = {}) {
        if (!roleId) {
            throw new Error("RoleUser must have a roleId.");
        }
        if (!userId) {
            throw new Error("RoleUser must have a userId.");
        }
        if (!orgId) {
            throw new Error("RoleUser must have a orgId.");
        }

        return Object.freeze({
            getRoleId: () => roleId,
            getUserId: () => userId,
            getOrgId: () => orgId,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000)
        });

    };
}

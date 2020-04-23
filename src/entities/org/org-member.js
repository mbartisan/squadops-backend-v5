export default function buildMakeOrgUser() {
    return function makeOrgUser(
        {
            orgId,
            userId,
            roleId,
            createdAt = ((Date.now() / 1000).toFixed()),
            updatedAt = ((Date.now() / 1000).toFixed()),
        } = {}) {

        if (!orgId) {
            throw new Error("Org users must be associated with an org.");
        }
        if (!userId) {
            throw new Error("Org users must be associated with a user.");
        }
        if (!roleId) {
            throw new Error("Org users must be associated with a role.");
        }

        return Object.freeze({
            getOrgId: () => orgId,
            getUserId: () => userId,
            getRoleId: () => roleId,
            setRoleId: (newRoleId) => {
                roleId = newRoleId;
            },
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000)
        });

    };
}

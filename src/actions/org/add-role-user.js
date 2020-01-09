import {makeRoleUser} from "../../entities/org/index.js";
export default function makeAddRoleUser({ orgsDb }) {
    return async function addRoleUser(roleUserData) {
        const roleUser = makeRoleUser(roleUserData);

        const exists = await orgsDb.roleUsers.query.findOne({ roleId: roleUser.getRoleId(), userId: roleUser.getUserId() });
        if (exists) throw new Error("RoleUser already exists.");

        return orgsDb.roleUsers.query.insert({
            roleId: roleUser.getRoleId(),
            userId: roleUser.getUserId(),
            orgId: roleUser.getOrgId(),
            createdAt: roleUser.getCreatedAt(),
        });
    }
}

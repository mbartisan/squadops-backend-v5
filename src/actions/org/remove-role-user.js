import {makeRoleUser} from "../../entities/org/index.js";
export default function makeRemoveRoleUser({ orgsDb }) {
    return async function addRemoveUser(roleUserData) {
        const roleUser = makeRoleUser(roleUserData);

        const exists = await orgsDb.roleUsers.query.findOne({ roleId: roleUser.getRoleId(), userId: roleUser.getUserId() });
        if (!exists) throw new Error("RoleUser does not exist.");

        return orgsDb.roleUsers.query.deleteWhere({
            roleId: roleUser.getRoleId(),
            userId: roleUser.getUserId(),
            orgId: roleUser.getOrgId()
        });
    }
}

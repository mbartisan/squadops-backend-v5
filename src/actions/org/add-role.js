import {makeRole} from "../../entities/org/index.js";
export default function makeAddRole({ orgsDb }) {
    return async function addRole(roleData) {
        const role = makeRole(roleData);

        const exists = await orgsDb.roles.query.findOne({ id: role.getId() });
        if (exists) throw new Error("Role already exists.");

        return orgsDb.roles.query.insert({
            orgId: role.getOrgId(),
            name: role.getName(),
            createdAt: role.getCreatedAt(),
            updatedAt: role.getUpdatedAt(),
        });
    }
}

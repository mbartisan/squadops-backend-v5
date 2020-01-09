import {makeUser} from "../../entities/org/index.js";
export default function makeAddUser({ orgsDb }) {
    return async function addUser(orgUserData) {
        const orgUser = makeUser(orgUserData);

        const exists = await orgsDb.orgUsers.query.findOne({ orgId: orgUser.getOrgId(), userId: orgUser.getUserId() });
        if (exists) throw new Error("OrgUser already exists.");

        return orgsDb.orgUsers.query.insert({
            orgId: orgUser.getOrgId(),
            userId: orgUser.getUserId(),
            createdAt: orgUser.getCreatedAt(),
        });
    }
}

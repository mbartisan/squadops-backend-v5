import {makeOrgUser} from "../../entities/org/index.js";
export default function makeAddOrgUser({ orgsDb }) {
    return async function addOrgUser(orgUserData) {
        const orgUser = makeOrgUser(orgUserData);

        const exists = await orgsDb.orgUsers.query.findOne({ orgId: orgUser.getOrgId(), userId: orgUser.getUserId() });
        if (exists) throw new Error("OrgUser already exists.");

        return orgsDb.orgUsers.query.insert({
            orgId: orgUser.getOrgId(),
            userId: orgUser.getUserId(),
            createdAt: orgUser.getCreatedAt(),
        });
    }
}

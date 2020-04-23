import {makeOrgMember} from "../../entities/org/index.js";
export default function makeCreateOrgMember({ db }) {
    return async function createOrgMember(data) {
        const orgMember = makeOrgMember(data);

        const exists = await db.orgs.orgs.members.query.findOne({ orgId: orgMember.getOrgId(), userId: orgMember.getUserId() });
        if (exists) throw new Error("OrgMember already exists.");

        return db.orgs.orgs.members.query.insert({
            orgId: orgMember.getOrgId(),
            userId: orgMember.getUserId(),
            roleId: orgMember.getRoleId(),
            createdAt: orgMember.getCreatedAt(),
        });
    }
}

import {makeOrgMember} from "../../entities/org/index.js";
export default function makeUpdateOrgMember({ db }) {
    return async function updateOrgMember({ orgId, userId, ...changes } = {}) {
        if (!orgId) throw new Error('You must supply an orgId.');
        if (!userId) throw new Error('You must supply an userId.');

        const existing = await db.orgs.orgs.members.query.findOne({ orgId, userId });
        if (!existing) throw new RangeError('OrgMember not found.');

        const orgMember = makeOrgMember({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await db.orgs.orgs.members.query.updateWhere({
            roleId: orgMember.getRoleId(),
            updatedAt: orgMember.getUpdatedAt()
        }, {
            orgId: orgMember.getOrgId(),
            userId: orgMember.getUserId()
        });
        return { ...updated }
    }
}

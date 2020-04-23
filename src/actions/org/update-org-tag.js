import {makeOrgTag} from "../../entities/org/index.js";
export default function makeUpdateOrgTag({ db }) {
    return async function updateOrgTag({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply the id.');

        const existing = await db.orgs.tags.query.findOne({ id });
        if (!existing) throw new RangeError('OrgTag not found.');

        const tag = makeOrgTag({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await db.orgs.tags.query.updateWhere({
            name: tag.getName(),
            updatedAt: tag.getUpdatedAt()
        }, {
            id: tag.getId()
        });
        return { ...updated }
    }
}

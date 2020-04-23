import {makeOrg} from "../../entities/org/index.js";
export default function makeUpdateOrg({ db }) {
    return async function updateOrg({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');

        const existing = await db.orgs.orgs.query.findOne({ id });
        if (!existing) throw new RangeError('Org not found.');

        const org = makeOrg({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await db.orgs.query.updateWhere({
            name: org.getName(),
            iconUrl: org.getIconUrl(),
            updatedAt: org.getUpdatedAt()
        }, {
            id: org.getId()
        });
        return { ...updated }
    }
}

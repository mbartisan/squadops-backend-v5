import {makeOrg} from "../../entities/org/index.js";
export default function makeEditOrg({ orgsDb }) {
    return async function editOrg({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');

        const existing = await orgsDb.orgs.findOne({ id });
        if (!existing) throw new RangeError('Org not found.');

        const org = makeOrg({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await orgsDb.orgs.query.updateWhere({
            name: org.getName(),
            icon: org.getIcon(),
            updatedAt: ((Date.now() / 1000).toFixed())
        }, {
            id: org.getId()
        });
        return { ...updated }
    }
}

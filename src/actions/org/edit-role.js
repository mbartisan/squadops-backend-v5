import {makeRole} from "../../entities/org/index.js";
export default function makeEditRole({ orgsDb }) {
    return async function editRole({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply the id.');

        const existing = await orgsDb.roles.findOne({ id });
        if (!existing) throw new RangeError('Role not found.');

        const role = makeRole({ ...existing, ...changes });

        const [updated] = await orgsDb.roles.query.updateWhere({
            name: role.getName(),
            updatedAt: ((Date.now() / 1000).toFixed())
        }, {
            id: role.getId()
        });
        return { ...updated }
    }
}

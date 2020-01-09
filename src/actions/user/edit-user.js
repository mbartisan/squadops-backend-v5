import {makeUser} from "../../entities/user/index.js";
export default function makeEditUser({ usersDb }) {
    return async function editUser({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');

        const existing = await usersDb.users.findOne({ id });
        if (!existing) throw new RangeError('User not found.');

        const user = makeUser({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await usersDb.users.query.updateWhere({
            name: user.getName(),
            email: user.getEmail(),
            updatedAt: ((Date.now() / 1000).toFixed())
        }, {
            id: user.getId()
        });
        return { ...updated }
    }
}

import {makeLinkedAccount} from "../../entities/user/index.js";
export default function makeEditLinkedAccount({ usersDb }) {
    return async function editLinkedAccount({ userId, key, ...changes } = {}) {
        if (!userId) throw new Error('You must supply the userId.');
        if (!key) throw new Error('You must supply the key.');

        const existing = await usersDb.linkedAccounts.findOne({ userId, key });
        if (!existing) throw new RangeError('Linked account not found.');

        const linkedAccount = makeLinkedAccount({ ...existing, ...changes });

        const [updated] = await usersDb.users.query.updateWhere({
            value: linkedAccount.getValue()
        }, {
            userId: linkedAccount.getUserId(),
            key: linkedAccount.getKey()
        });
        return { ...updated }
    }
}

import {makeUserLinkedAccount} from "../../entities/user/index.js";
export default function makeUpdateUserLinkedAccount({ db }) {
    return async function updateUserLinkedAccount({ userId, key, ...changes } = {}) {
        if (!userId) throw new Error('You must supply the userId.');
        if (!key) throw new Error('You must supply the key.');

        const existing = await db.users.linkedAccounts.query.findOne({ userId, key });
        if (!existing) throw new RangeError('Linked account not found.');

        const linkedAccount = makeUserLinkedAccount({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await db.users.users.query.updateWhere({
            value: linkedAccount.getValue(),
            updatedAt: linkedAccount.getUpdatedAt(),
        }, {
            userId: linkedAccount.getUserId(),
            key: linkedAccount.getKey()
        });
        return { ...updated }
    }
}

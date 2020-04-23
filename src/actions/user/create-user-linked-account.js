import {makeUserLinkedAccount} from "../../entities/user/index.js";
export default function makeCreateUserLinkedAccount({ db }) {
    return async function createUserLinkedAccount(linkedAccountData) {
        const linkedAccount = makeUserLinkedAccount(linkedAccountData);

        const exists = await db.users.linkedAccounts.query.findOne({ userId: linkedAccount.getUserId(), key: linkedAccount.getKey() });
        if (exists) throw new Error("Linked account already exists.");

        return db.users.linkedAccounts.query.insert({
            userId: linkedAccount.getUserId(),
            key: linkedAccount.getKey(),
            value: linkedAccount.getValue(),
            createdAt: linkedAccount.getCreatedAt(),
        });
    }
}

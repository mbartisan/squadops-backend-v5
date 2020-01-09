import {makeLinkedAccount} from "../../entities/user/index.js";
export default function makeAddLinkedAccount({ usersDb }) {
    return async function addLinkedAccount(linkedAccountData) {
        const linkedAccount = makeLinkedAccount(linkedAccountData);

        const exists = await usersDb.linkedAccounts.query.findOne({ userId: linkedAccount.getUserId(), key: linkedAccount.getKey() });
        if (exists) throw new Error("Linked account already exists.");

        return usersDb.linkedAccounts.query.insert({
            userId: linkedAccount.getUserId(),
            key: linkedAccount.getKey(),
            value: linkedAccount.getValue()
        });
    }
}

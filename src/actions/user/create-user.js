import {makeUser,makeUserCredential,hashPassword} from "../../entities/user/index.js";
export default function makeCreateUser({ db }) {
    return async function createUser(data) {
        const user = makeUser(data);
        let hashedPassword = null;

        if (data.password) {
            if (data.password.length <= 6) throw new Error('Your password must be greater than 6 characters.');
            hashedPassword = await hashPassword(data.password);
        }

        const exists = await db.users.users.query.findOne({ email: user.getEmail() });
        if (exists) throw new Error('There is already an account with the email ' + user.getEmail());


        const userRecord = await db.users.users.query.insert({
            name: user.getName(),
            email: user.getEmail(),
            identity: user.getIdentity(),
            createdAt: user.getCreatedAt()
        });

        if (hashedPassword) {
            const credential = makeUserCredential({ userId: userRecord.id, type: 'password', hashedData: hashedPassword });

            await db.users.credentials.query.insert({
                userId: credential.getUserId(),
                type: credential.getType(),
                hashedData: credential.getHashedData(),
                expiresAt: credential.getExpiresAt()
            });
        }

        return userRecord;
    }
}

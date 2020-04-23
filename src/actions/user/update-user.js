import {makeUser,makeUserCredential,hashPassword} from "../../entities/user/index.js";
export default function makeUpdateUser({ db }) {
    return async function updateUser({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');
        let hashedPassword = null;

        const existing = await db.users.users.query.findOne({ id });
        if (!existing) throw new RangeError('User not found.');

        if (changes.password) {
            if (changes.password.length <= 6) throw new Error('Your password must be greater than 6 characters.');
            hashedPassword = await hashPassword(changes.password);
            delete changes.password;

            const credential = makeUserCredential({ userId: id, type: 'password', hashedData: hashedPassword, updatedAt: ((Date.now() / 1000).toFixed()) });
            await db.users.credentials.query.update({
                hashedData: credential.getHashedData(),
                expiresAt: credential.getExpiresAt(),
                updatedAt: credential.getUpdatedAt(),
            }, { userId: id, type: 'password' });
        }

        const user = makeUser({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await db.users.users.query.updateWhere({
            name: user.getName(),
            email: user.getEmail(),
            updatedAt: user.getUpdatedAt()
        }, {
            id: user.getId()
        });
        return { ...updated }
    }
}

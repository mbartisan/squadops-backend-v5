import {makeUserCredential,generateToken,hashToken} from "../../entities/user/index.js";
export default function makeCreateAccessToken({ db }) {
    return async function createAccessToken({ userId, expiresAt }) {
        const token = generateToken();

        let cred = makeUserCredential({
            type: 'access_token',
            userId,
            hashedData: hashToken(token),
            expiresAt
        });

        const credRecord = await db.users.credentials.query.insert({
            userId: cred.getUserId(),
            type: cred.getType(),
            hashedData: cred.getHashedData(),
            expiresAt: cred.getExpiresAt(),
            createdAt: cred.getCreatedAt(),
        });

        return {
            ...credRecord,
            accessToken: token
        };
    };
}

const ENUM_TYPES = [
    "password",
    "access_token"
];
export default function buildMakeUserCredential() {
    return function makeUserCredential(
        {
            id,
            userId,
            type,
            hashedData,
            expiresAt,
            createdAt = ((Date.now() / 1000).toFixed()),
            updatedAt = ((Date.now() / 1000).toFixed())
        } = {}) {

        if (!userId) {
            throw new Error("Credentials must belong to a user.");
        }

        if (!type) {
            throw new Error("Credentials must have a type.");
        }
        type = type.toLowerCase();
        if (!ENUM_TYPES.includes(type)) {
            throw new Error('Invalid credential type. Enum: ' + ENUM_TYPES.join(", "));
        }

        if (!hashedData) {
            throw new Error('Credentials must have hashedData.');
        }

        return Object.freeze({
            getId: () => id,
            getUserId: () => userId,
            getType: () => type,
            getHashedData: () => hashedData,
            getExpiresAt: () => expiresAt,
            getExpiresOn: () => {
                if (!expiresAt) return null;
                return new Date(expiresAt * 1000)
            },
            isExpired: () => {
                const now = (Date.now() / 1000).toFixed(2);
                return expiresAt != null && now > expiresAt;
            },
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000),
        });

    };
}

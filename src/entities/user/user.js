export default function buildMakeUser ({ md5, uuid }) {
    return function makeUser (
        {
            id,
            name,
            email,
            identity = identityGenerator(),
            createdAt = ((Date.now() / 1000).toFixed()),
            updatedAt = ((Date.now() / 1000).toFixed())
        } = {}) {

        if (!name) {
            throw new Error("User must have a name.");
        }
        name = name.trim();
        if (name.length < 2) {
            throw new Error("User's name must be longer than 2 characters.");
        }

        if (!email) {
            throw new Error("User must have an email.");
        }
        email = email.trim();
        const validEmailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,64})?$/;
        if (email.length === 0 || !validEmailRegex.test(email)) {
            throw new Error("User must have a valid email.");
        }

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getUsername: () => name,
            getEmail: () => email,
            getIdentity: () => identity,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000)
        });

    };

    function identityGenerator() {
        return md5(uuid());
    }
}

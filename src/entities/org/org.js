export default function buildMakeOrg () {
    return function makeOrg (
        {
            id,
            ownerId,
            name,
            icon,
            createdAt = ((Date.now() / 1000).toFixed()),
            updatedAt = ((Date.now() / 1000).toFixed())
        } = {}) {
        if (!name) {
            throw new Error("Org must have a name.");
        }
        name = name.trim();
        if (name.length < 2) {
            throw new Error("Org's name must be longer than 2 characters.");
        }
        if (!ownerId) {
            throw new Error("Org must have an ownerId.");
        }

        return Object.freeze({
            getId: () => id,
            getOwnerId: () => ownerId,
            getName: () => name,
            getIcon: () => icon,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000)
        });

    };
}

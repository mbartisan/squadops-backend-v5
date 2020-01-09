export default function buildMakeLinkedAccount () {
    return function makeLinkedAccount (
        {
            user,
            userId,
            key,
            value
        } = {}) {
        if (user && user.id) userId = user.id;
        if (!userId) {
            throw new Error("Linked account must have a userId.");
        }

        if (!key) {
            throw new Error("Linked account must have a key.");
        }

        return Object.freeze({
            getUserId: () => userId,
            getKey: () => key,
            getValue: () => value
        });

    };
}

export default function buildMakeRegistration () {
    return function makeRegistration (
        {
            id,
            eventId,
            registrationSectionId,
            userId,
            isUnregistered = 0,
            didAttend = 0,
            createdAt = ((Date.now() / 1000).toFixed()),
            updatedAt = ((Date.now() / 1000).toFixed())
        } = {}) {
        if (!eventId) {
            throw new Error("Registration must have a eventId.");
        }
        if (!registrationSectionId) {
            throw new Error("Registration must have a registrationSectionId.");
        }
        if (!userId) {
            throw new Error("Registration must have a userId.");
        }
        if (!isUnregistered || !(isUnregistered === 1 || isUnregistered === 0)) {
            throw new Error("Registration must have a isUnregistered set to 1 or 0.");
        }
        if (!didAttend || !(didAttend === 1 || didAttend === 0)) {
            throw new Error("Registration must have a didAttend set to 1 or 0.");
        }

        return Object.freeze({
            getId: () => id,
            getEventId: () => eventId,
            getRegistrationSectionId: () => registrationSectionId,
            getUserId: () => userId,
            getIsUnregistered: () => isUnregistered,
            getDidAttend: () => didAttend,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000)
        });

    };
}

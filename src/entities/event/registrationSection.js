export default function buildMakeRegistrationSection () {
    return function makeRegistrationSection (
        {
            id,
            eventId,
            name,
            registrationLimit = -1,
            useWaitlist = 0,
            sort = 0,
            createdAt = ((Date.now() / 1000).toFixed())
        } = {}) {
        if (!eventId) {
            throw new Error("RegistrationSection must have a eventId.");
        }
        if (!name) {
            throw new Error("RegistrationSection must have a name.");
        }
        if (!registrationLimit || !(parseInt(registrationLimit) == registrationLimit)) {
            throw new Error("RegistrationSection must have a registrationLimit.");
        }
        if (!useWaitlist || !(useWaitlist === 1 || useWaitlist === 0)) {
            throw new Error("RegistrationSection must have a useWaitlist set to 1 or 0.");
        }
        if (!sort || !(parseInt(sort) == sort)) {
            throw new Error("RegistrationSection must have a sort.");
        }

        return Object.freeze({
            getId: () => id,
            getEventId: () => eventId,
            getName: () => name,
            getRegistrationLimit: () => registrationLimit,
            getUseWaitlist: () => useWaitlist,
            getSort: () => sort,
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000)
        });

    };
}

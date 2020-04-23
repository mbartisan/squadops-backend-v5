export default function buildMakeEventRegistrationSection () {
    return function makeEventRegistrationSection (
        {
            id,
            eventId,
            name,
            registrationLimit = -1,
            useWaitlist = 0,
            sort = 0,
            createdAt = ((Date.now() / 1000).toFixed()),
            updatedAt = ((Date.now() / 1000).toFixed())
        } = {}) {

        if (!name) {
            throw new Error("RegistrationSection must have a name.");
        }

        if (!registrationLimit || !(parseInt(registrationLimit) == registrationLimit)) {
            throw new Error("RegistrationSection must have a registrationLimit.");
        }

        if (useWaitlist == null || !(useWaitlist === 1 || useWaitlist === 0)) {
            throw new Error("RegistrationSection must have a useWaitlist set to 1 or 0.");
        }

        if (sort == null || !(parseInt(sort) == sort)) {
            throw new Error("RegistrationSection must have a sort.");
        }

        return Object.freeze({
            getId: () => id,
            getEventId: () => eventId,
            getName: () => name,
            setName: (val) => {
                name = val;
            },
            getRegistrationLimit: () => registrationLimit,
            setRegistrationLimit: (val) => {
                registrationLimit = val;
            },
            getUseWaitlist: () => useWaitlist,
            setUseWaitlist: (val) => {
                useWaitlist = val;
            },
            getSort: () => sort,
            setSort: (val) => {
                sort = val;
            },
            getCreatedAt: () => createdAt,
            getCreatedOn: () => new Date(createdAt * 1000),
            getUpdatedAt: () => updatedAt,
            getUpdatedOn: () => new Date(updatedAt * 1000)
        });

    };
}

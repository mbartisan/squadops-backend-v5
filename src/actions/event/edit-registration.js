import {makeRegistration} from "../../entities/event/index.js";
export default function makeEditRegistration({ eventsDb }) {
    return async function editRegistration({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');

        const existing = await eventsDb.registrations.query.findOne({ id });
        if (!existing) throw new RangeError('Registration not found.');

        const registration = makeRegistration({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await eventsDb.registrations.query.updateWhere({
            isUnregistered: registration.getIsUnregistered(),
            didAttend: registration.getDidAttend(),
            updatedAt: registration.getUpdatedAt()
        }, {
            id: registration.getId()
        });
        return { ...updated }
    }
}

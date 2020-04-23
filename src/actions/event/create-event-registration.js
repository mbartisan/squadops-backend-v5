import {makeEventRegistration} from "../../entities/event/index.js";
export default function makeCreateEventRegistration({ db }) {
    return async function createEventRegistration(data) {
        const registration = makeEventRegistration(data);

        const exists = await db.events.registrations.query.findOne({ id: registration.getId() });
        if (exists) throw new Error("Registration already exists.");

        return db.events.registrations.query.insert({
            eventId: registration.getEventId(),
            registrationSectionId: registration.getRegistrationSectionId(),
            userId: registration.getUserId(),
            isUnregistered: registration.getIsUnregistered(),
            didAttend: registration.getDidAttend(),
            createdAt: registration.getCreatedAt(),
        });
    }
}

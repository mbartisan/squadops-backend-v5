import {makeRegistration} from "../../entities/event/index.js";
export default function makeAddRegistration({ eventsDb }) {
    return async function addRegistration(registrationData) {
        const registration = makeRegistration(registrationData);

        const exists = await eventsDb.registrations.query.findOne({ id: registration.getId() });
        if (exists) throw new Error("Registration already exists.");

        return eventsDb.registrations.query.insert({
            eventId: registration.getEventId(),
            registrationSectionId: registration.getRegistrationSectionId(),
            userId: registration.getUserId(),
            isUnregistered: registration.getIsUnregistered(),
            didAttend: registration.getDidAttend(),
            createdAt: registration.getCreatedAt(),
            updatedAt: registration.getUpdatedAt()
        });
    }
}

import {makeEvent} from "../../entities/event/index.js";
export default function makeAddEvent({ eventsDb }) {
    return async function addEvent(eventData) {
        const event = makeEvent(eventData);

        const exists = await eventsDb.events.query.findOne({ id: event.getId() });
        if (exists) throw new Error("Event already exists.");

        return eventsDb.events.query.insert({
            orgId: event.getOrgId(),
            name: event.getName(),
            body: event.getBody(),
            startAt: event.getStartAt(),
            endAt: event.getEndAt(),
            registrationStartAt: event.getRegistrationStartAt(),
            registrationEndAt: event.getRegistrationEndAt(),
            isPublished: event.getIsPublished(),
            createdAt: event.getCreatedAt(),
            updatedAt: event.getUpdatedAt()
        });
    }
}

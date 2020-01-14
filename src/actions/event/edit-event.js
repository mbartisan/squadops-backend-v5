import {makeEvent} from "../../entities/event/index.js";
export default function makeEditEvent({ eventsDb }) {
    return async function editEvent({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');

        const existing = await eventsDb.events.query.findOne({ id });
        if (!existing) throw new RangeError('Event not found.');

        const event = makeEvent({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await eventsDb.events.query.updateWhere({
            name: event.getName(),
            body: event.getBody(),
            startAt: event.getStartAt(),
            endAt: event.getEndAt(),
            registrationStartAt: event.getRegistrationStartAt(),
            registrationEndAt: event.getRegistrationEndAt(),
            isPublished: event.getIsPublished(),
            updatedAt: ((Date.now() / 1000).toFixed())
        }, {
            id: event.getId()
        });
        return { ...updated }
    }
}

import {makeEvent} from "../../entities/event/index.js";
export default function makeUpdateEvent({ db }) {
    return async function updateEvent({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');

        const existing = await db.events.events.query.findOne({ id });
        if (!existing) throw new RangeError('Event not found.');

        const event = makeEvent({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await db.events.events.query.updateWhere({
            name: event.getName(),
            body: event.getBody(),
            startAt: event.getStartAt(),
            endAt: event.getEndAt(),
            registrationStartAt: event.getRegistrationStartAt(),
            registrationEndAt: event.getRegistrationEndAt(),
            isPublished: event.getIsPublished(),
            updatedAt: event.getUpdatedAt()
        }, {
            id: event.getId()
        });

        const registrationSections = event.getRegistrationSections();
        if (registrationSections) {
            updated.registrationSections = await Promise.all(registrationSections.map(section => {
                return new Promise(async resolve => {
                    if (section.getId()) {
                        // todo: handle if there are registrations in this section
                        // todo: handle if a registration section was not included (i.e. was deleted)
                        const [updated] = await db.events.registrationSections.query.updateWhere({
                            name: section.getName(),
                            registrationLimit: section.getRegistrationLimit(),
                            useWaitlist: section.getUseWaitlist(),
                            sort: section.getSort(),
                            updatedAt: section.getUpdatedAt()
                        }, {
                            id: section.getId()
                        });
                        return resolve(updated);
                    } else {
                        const record = await db.events.registrationSections.query.insert({
                            eventId: event.getId(),
                            name: section.getName(),
                            registrationLimit: section.getRegistrationLimit(),
                            useWaitlist: section.getUseWaitlist(),
                            sort: section.getSort(),
                            createdAt: section.getCreatedAt()
                        });
                        return resolve(record);
                    }
                });
            }));
        }

        return { ...updated }
    }
}

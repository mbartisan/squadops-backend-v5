import { makeEvent } from '../../entities/event/index.js';

export default function makeCreateEvent({ db }) {
  return async function createEvent(data) {
    const event = makeEvent(data);

    const exists = await db.events.events.query.findOne({ id: event.getId() });
    if (exists) throw new Error('Event already exists.');

    const record = await db.events.events.query.insert({
      orgId: event.getOrgId(),
      name: event.getName(),
      body: event.getBody(),
      startAt: event.getStartAt(),
      endAt: event.getEndAt(),
      registrationStartAt: event.getRegistrationStartAt(),
      registrationEndAt: event.getRegistrationEndAt(),
      isPublished: event.getIsPublished(),
      createdAt: event.getCreatedAt(),
    });

    if (event.getRegistrationSections()) {
      record.registrationSections = await Promise.all(
        event.getRegistrationSections().map((section) => db.events.registrationSections.query.insert({
          eventId: record.id,
          name: section.getName(),
          registrationLimit: section.getRegistrationLimit(),
          useWaitlist: section.getUseWaitlist(),
          sort: section.getSort(),
          createdAt: section.getCreatedAt(),
        })),
      );
    }

    return record;
  };
}

import { makeEventRegistrationSection } from '../../entities/event/index.js';

export default function makeCreateEventRegistrationSection({ db }) {
  return async function createEventRegistrationSection(sectionData) {
    const section = makeEventRegistrationSection(sectionData);

    const exists = await db.events.registrationSections.query.findOne({ id: section.getId() });
    if (exists) throw new Error('Section already exists.');

    return db.events.registrationSections.query.insert({
      eventId: section.getEventId(),
      name: section.getName(),
      registrationLimit: section.getRegistrationLimit(),
      useWaitlist: section.getUseWaitlist(),
      sort: section.getSort(),
      createdAt: section.getCreatedAt(),
    });
  };
}

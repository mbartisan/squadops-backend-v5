import { makeEventRegistrationSection } from '../../entities/event/index.js';

export default function makeUpdateEventRegistrationSection({ db }) {
  return async function updateEventRegistrationSection({ id, ...changes } = {}) {
    if (!id) throw new Error('You must supply an id.');

    const existing = await db.events.registrationSections.query.findOne({ id });
    if (!existing) throw new RangeError('Registration Section not found.');

    const section = makeRegistrationSection({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

    const [updated] = await db.events.registrationSections.query.updateWhere({
      name: section.getName(),
      registrationLimit: section.getRegistrationLimit(),
      useWaitlist: section.getUseWaitlist(),
      sort: section.getSort(),
      updatedAt: section.getUpdatedAt(),
    }, {
      id: section.getId(),
    });
    return { ...updated };
  };
}

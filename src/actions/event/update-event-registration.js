import { makeEventRegistration } from '../../entities/event/index.js';

export default function makeUpdateEventRegistration({ db }) {
  return async function updateEventRegistration({ id, ...changes } = {}) {
    if (!id) throw new Error('You must supply an id.');

    const existing = await db.events.registrations.query.findOne({ id });
    if (!existing) throw new RangeError('Registration not found.');

    const registration = makeRegistration({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

    const [updated] = await db.events.registrations.query.updateWhere({
      isUnregistered: registration.getIsUnregistered(),
      didAttend: registration.getDidAttend(),
      updatedAt: registration.getUpdatedAt(),
    }, {
      id: registration.getId(),
    });
    return { ...updated };
  };
}

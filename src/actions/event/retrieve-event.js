export default function makeRetrieveEvent({ db }) {
  return async function retrieveEvent(eventId) {
    const event = await db.events.events.query.findOne({ id: eventId });
    event.registrationSections = await db.events.registrationSections.query.findAll({ eventId });
    return event;
  };
}

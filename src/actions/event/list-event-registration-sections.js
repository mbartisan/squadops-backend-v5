export default function makeListEventRegistrationSections({ db }) {
  return async function listEventRegistrationSections(searchParameters) {
    return await db.events.registrationSections.query.findAll(searchParameters);
  };
}

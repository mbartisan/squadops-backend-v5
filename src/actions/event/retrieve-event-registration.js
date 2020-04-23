export default function makeRetrieveEventRegistration({ db }) {
    return async function retrieveEventRegistration(registrationId) {
        const registration = await db.events.registrations.query.findOne({ id: registrationId });
        return registration;
    }
}

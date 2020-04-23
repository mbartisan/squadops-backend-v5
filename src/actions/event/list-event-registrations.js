export default function makeListEventRegistrations({ db }) {
    return async function listEventRegistrations(searchParameters) {
        return await db.events.registrations.query.findAll(searchParameters);
    }
}

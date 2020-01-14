export default function makeListRegistrations({ eventsDb }) {
    return async function listRegistrations(searchParameters) {
        return await eventsDb.registrations.query.findAll(searchParameters);
    }
}

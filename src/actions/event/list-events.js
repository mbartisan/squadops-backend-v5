export default function makeListEvents({ eventsDb }) {
    return async function listEvents(searchParameters) {
        return await eventsDb.events.query.findAll(searchParameters);
    }
}

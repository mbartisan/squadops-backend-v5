export default function makeListRegistrationSections({ eventsDb }) {
    return async function listRegistrationSections(searchParameters) {
        return await eventsDb.registrationSections.query.findAll(searchParameters);
    }
}

export default function makeRetrieveEventRegistrationSection({ db }) {
    return async function retrieveEventRegistrationSection(sectionId) {
        const section = await db.events.registrationSections.query.findOne({ id: sectionId });
        return section;
    }
}

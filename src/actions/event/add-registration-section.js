import {makeRegistrationSection} from "../../entities/event/index.js";
export default function makeAddRegistrationSection({ eventsDb }) {
    return async function addRegistrationSection(sectionData) {
        const section = makeRegistrationSection(sectionData);

        const exists = await eventsDb.registrationSections.query.findOne({ id: section.getId() });
        if (exists) throw new Error("Section already exists.");

        return eventsDb.registrationSections.query.insert({
            eventId: section.getEventId(),
            name: section.getName(),
            registrationLimit: section.getRegistrationLimit(),
            useWaitlist: section.getUseWaitlist(),
            sort: section.getSort(),
            createdAt: section.getCreatedAt()
        });
    }
}

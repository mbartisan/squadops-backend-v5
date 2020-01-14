import {makeRegistrationSection} from "../../entities/event/index.js";
export default function makeEditRegistrationSection({ eventsDb }) {
    return async function editRegistrationSection({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');

        const existing = await eventsDb.registrationSections.query.findOne({ id });
        if (!existing) throw new RangeError('Registration Section not found.');

        const section = makeRegistrationSection({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await eventsDb.registrationSections.query.updateWhere({
            name: section.getName(),
            registrationLimit: section.getRegistrationLimit(),
            useWaitlist: section.getUseWaitlist(),
            sort: section.getSort(),
        }, {
            id: section.getId()
        });
        return { ...updated }
    }
}

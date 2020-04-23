import {makeRegistrationTemplate} from "../../entities/event/index.js";
export default function makeUpdateRegistrationTemplate({ db }) {
    return async function updateRegistrationTemplate({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply an id.');

        const existing = await db.events.registrationTemplates.query.findOne({ id });
        if (!existing) throw new RangeError('Template not found.');

        const template = makeRegistrationTemplate({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

        const [updated] = await db.events.registrationTemplates.query.updateWhere({
            name: template.getName(),
            template: template.getTemplate(),
            updatedAt: template.getUpdatedAt()
        }, {
            id: template.getId()
        });
        return { ...updated }
    }
}

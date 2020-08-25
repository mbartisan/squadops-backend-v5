import { makeRegistrationTemplate } from '../../entities/event/index.js';

export default function makeCreateRegistrationTemplate({ db }) {
  return async function createRegistrationTemplate(data) {
    const template = makeRegistrationTemplate(data);

    const exists = await db.events.registrationTemplates.query.findOne({ id: template.getId() });
    if (exists) throw new Error('Template already exists.');

    return db.events.registrationTemplates.query.insert({
      orgId: template.getOrgId(),
      name: template.getName(),
      template: template.getTemplate(),
      createdAt: template.getCreatedAt(),
    });
  };
}

export default function makeRetrieveRegistrationTemplate({ db }) {
    return async function retrieveRegistrationTemplate(templateId) {
        const template = await db.events.registrationTemplates.query.findOne({ id: templateId });
        if (template.template) template.template = JSON.parse(template.template);
        return template;
    }
}

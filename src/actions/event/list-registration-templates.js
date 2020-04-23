export default function makeListRegistrationTemplates({ db }) {
    return async function listRegistrationTemplates(searchParameters) {
        const templates = await db.events.registrationTemplates.query.findAll(searchParameters);
        templates.forEach(template => {
            if (template.template) template.template = JSON.parse(template.template);
        });
        return templates;
    }
}

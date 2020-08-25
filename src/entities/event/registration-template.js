export default function buildMakeRegistrationTemplate() {
  return function makeRegistrationTemplate(
    {
      id,
      orgId,
      name,
      template,
      createdAt = ((Date.now() / 1000).toFixed()),
      updatedAt = ((Date.now() / 1000).toFixed()),
    } = {},
  ) {
    if (!orgId) {
      throw new Error('RegistrationTemplate must have a orgId.');
    }

    if (!name) {
      throw new Error('RegistrationTemplate must have a name.');
    }

    if (!template) {
      throw new Error('RegistrationTemplate must have a template.');
    }

    if (typeof template === 'string' || template instanceof String) {
      template = JSON.parse(template);
    }
    template = JSON.stringify(template);

    return Object.freeze({
      getId: () => id,
      getOrgId: () => orgId,
      getName: () => name,
      setName: (val) => {
        name = val;
      },
      getTemplate: () => template,
      setTemplate: (val) => {
        if (typeof val === 'string' || val instanceof String) {
          template = JSON.parse(template);
        }
        template = JSON.stringify(val);
      },
      getCreatedAt: () => createdAt,
      getCreatedOn: () => new Date(createdAt * 1000),
      getUpdatedAt: () => updatedAt,
      getUpdatedOn: () => new Date(updatedAt * 1000),
    });
  };
}

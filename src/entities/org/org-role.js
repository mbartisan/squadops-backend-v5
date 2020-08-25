export default function buildMakeOrgRole() {
  return function makeOrgRole(
    {
      id,
      orgId,
      name,
      createdAt = ((Date.now() / 1000).toFixed()),
      updatedAt = ((Date.now() / 1000).toFixed()),
    } = {},
  ) {
    if (!name) {
      throw new Error('Role must have a name.');
    }
    name = name.trim();
    if (!orgId) {
      throw new Error('Role must have an orgId.');
    }

    return Object.freeze({
      getId: () => id,
      getOrgId: () => orgId,
      getName: () => name,
      getCreatedAt: () => createdAt,
      getCreatedOn: () => new Date(createdAt * 1000),
      getUpdatedAt: () => updatedAt,
      getUpdatedOn: () => new Date(updatedAt * 1000),
    });
  };
}

import { makeOrgRole } from '../../entities/org/index.js';

export default function makeCreateOrgRole({ db }) {
  return async function createOrgRole(data) {
    const role = makeOrgRole(data);

    const exists = await db.orgs.roles.query.findOne({ id: role.getId() });
    if (exists) throw new Error('Role already exists.');

    return db.orgs.roles.query.insert({
      orgId: role.getOrgId(),
      name: role.getName(),
      createdAt: role.getCreatedAt(),
    });
  };
}

import { makeOrgRole } from '../../entities/org/index.js';

export default function makeUpdateOrgRole({ db }) {
  return async function updateOrgRole({ id, ...changes } = {}) {
    if (!id) throw new Error('You must supply the id.');

    const existing = await db.orgs.roles.query.findOne({ id });
    if (!existing) throw new RangeError('Role not found.');

    const role = makeOrgRole({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

    const [updated] = await db.orgs.roles.query.updateWhere({
      name: role.getName(),
      updatedAt: role.getUpdatedAt(),
    }, {
      id: role.getId(),
    });
    return { ...updated };
  };
}

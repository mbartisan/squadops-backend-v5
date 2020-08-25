import { makeOrg } from '../../entities/org/index.js';

export default function makeCreateOrg({ db, createOrgRole, createOrgMember }) {
  return async function createOrg(orgData) {
    const org = makeOrg(orgData);

    const exists = await db.orgs.orgs.query.findOne({ id: org.getId() });
    if (exists) throw new Error('Org already exists.');

    const record = await db.orgs.orgs.query.insert({
      ownerId: org.getOwnerId(),
      name: org.getName(),
      iconUrl: org.getIconUrl(),
      createdAt: org.getCreatedAt(),
    });

    const role = await createOrgRole({ orgId: record.id, name: 'Default Role' });
    await createOrgMember({ orgId: record.id, userId: org.getOwnerId(), roleId: role.id });

    return record;
  };
}

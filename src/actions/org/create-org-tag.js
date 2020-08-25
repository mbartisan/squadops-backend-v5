import { makeOrgTag } from '../../entities/org/index.js';

export default function makeCreateOrgTag({ db }) {
  return async function createOrgTeam(data) {
    const tag = makeOrgTag(data);

    const exists = await db.orgs.tags.query.findOne({ id: tag.getId() });
    if (exists) throw new Error('Tag already exists.');

    return db.orgs.tags.query.insert({
      orgId: tag.getOrgId(),
      name: tag.getName(),
      createdAt: tag.getCreatedAt(),
    });
  };
}

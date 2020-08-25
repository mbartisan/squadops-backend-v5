import { makeOrgTagMember } from '../../entities/org/index.js';

export default function makeCreateOrgTagMember({ db }) {
  return async function createOrgTagMember(data) {
    const tagMember = makeOrgTagMember(data);

    const exists = await db.orgs.teams.members.query.findOne({
      tagId: tagMember.getTagId(),
      userId: tagMember.getUserId(),
    });
    if (exists) throw new Error('TeamMember already exists.');

    return db.orgs.teams.members.query.insert({
      tagId: tagMember.getTagId(),
      userId: tagMember.getUserId(),
      createdAt: tagMember.getCreatedAt(),
    });
  };
}

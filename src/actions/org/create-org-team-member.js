import { makeOrgTeamMember } from '../../entities/org/index.js';

export default function makeCreateOrgTeamMember({ db }) {
  return async function createOrgTeamMember(data) {
    const teamMember = makeOrgTeamMember(data);

    const exists = await db.orgs.teams.members.query.findOne({
      teamId: teamMember.getTeamId(),
      userId: teamMember.getUserId(),
    });
    if (exists) throw new Error('TeamMember already exists.');

    return db.orgs.teams.members.query.insert({
      teamId: teamMember.getTeamId(),
      userId: teamMember.getUserId(),
      isLeader: teamMember.getIsLeader(),
      createdAt: teamMember.getCreatedAt(),
    });
  };
}

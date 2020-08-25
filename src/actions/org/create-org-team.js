import { makeOrgTeam } from '../../entities/org/index.js';

export default function makeCreateOrgTeam({ db }) {
  return async function createOrgTeam(data) {
    const team = makeOrgTeam(data);

    const exists = await db.orgs.teams.query.findOne({ id: team.getId() });
    if (exists) throw new Error('Team already exists.');

    return db.orgs.teams.query.insert({
      orgId: team.getOrgId(),
      name: team.getName(),
      color: team.getColor(),
      icon: team.getIcon(),
      createdAt: team.getCreatedAt(),
    });
  };
}

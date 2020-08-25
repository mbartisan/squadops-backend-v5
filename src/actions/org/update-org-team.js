import { makeOrgTeam } from '../../entities/org/index.js';

export default function makeUpdateOrgTeam({ db }) {
  return async function updateOrgTeam({ id, ...changes } = {}) {
    if (!id) throw new Error('You must supply the id.');

    const existing = await db.orgs.teams.query.findOne({ id });
    if (!existing) throw new RangeError('Team not found.');

    const team = makeOrgTeam({ ...existing, ...changes, updatedAt: ((Date.now() / 1000).toFixed()) });

    const [updated] = await db.orgs.teams.query.updateWhere({
      name: team.getName(),
      color: team.getColor(),
      icon: team.getIcon(),
      updatedAt: team.getUpdatedAt(),
    }, {
      id: team.getId(),
    });
    return { ...updated };
  };
}

export default function makeListUserOrgsTeams({ db }) {
  return async function listUserOrgsTeams(searchParameters) {
    const members = await db.orgs.teams.members.query.findAll(searchParameters);

    const teamIds = [];

    members.forEach((member) => {
      teamIds.push(member.teamId);
    });

    const [
      teams,
    ] = await Promise.all([
      db.orgs.teams.query.findAll({ id: teamIds }),
    ]);

    return members.map((member) => {
      member.team = teams.find((t) => t.id === member.teamId);
      return member;
    });
  };
}

export default function makeListOrgTagMembers({ db }) {
  return async function listOrgTagMembers(searchParameters) {
    const members = await db.orgs.tags.members.query.findAll(searchParameters);

    const userIds = [];

    members.forEach((member) => {
      userIds.push(member.userId);
    });

    const [
      users,
    ] = await Promise.all([
      db.users.users.query.findAll({ id: userIds }),
    ]);

    return members.map((member) => {
      member.user = users.find((u) => u.id === member.userId);
      return member;
    });
  };
}

export default function makeListOrgTeamMembers({ db }) {
    return async function listOrgTeamMembers(searchParameters) {
        const members = await db.orgs.teams.members.query.findAll(searchParameters);

        const userIds = [];

        members.forEach(member => {
            userIds.push(member.userId);
        });

        const [
            users,
        ] = await Promise.all([
            db.users.users.query.findAll({ id: userIds }),
        ]);

        return members.map(member => {
            member.user = users.find(u => u.id === member.userId);
            return member;
        });
    }
}

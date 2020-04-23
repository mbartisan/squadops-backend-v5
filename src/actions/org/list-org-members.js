export default function makeListOrgMembers({ db }) {
    return async function listOrgMembers(searchParameters) {
        const members = await db.orgs.orgs.members.query.findAll(searchParameters);

        const userIds = [];
        const roleIds = [];

        members.forEach(member => {
            userIds.push(member.userId);
            roleIds.push(member.roleId);
        });

        const [
            users,
            roles,
        ] = await Promise.all([
            db.users.users.query.findAll({ id: userIds }),
            db.orgs.roles.query.findAll({ id: roleIds }),
        ]);

        return members.map(member => {
            member.user = users.find(u => u.id === member.userId);
            member.role = roles.find(r => r.id === member.roleId);
            return member;
        });
    }
}

export default function makeListUserOrgs({ db }) {
    return async function listUserOrgs(searchParameters) {
        const members = await db.orgs.orgs.members.query.findAll(searchParameters);

        const orgIds = [];
        const roleIds = [];

        members.forEach(member => {
            orgIds.push(member.orgId);
            roleIds.push(member.roleId);
        });

        const [
            orgs,
            roles,
        ] = await Promise.all([
            db.orgs.orgs.query.findAll({ id: orgIds }),
            db.orgs.roles.query.findAll({ id: roleIds }),
        ]);

        members.forEach(member => {
            member.org = orgs.find(o => o.id === member.orgId);
            member.role = roles.find(r => r.id === member.roleId);
        });

        return orgs.map(org => {
            org.role = roles.find(r => r.orgId === org.id);
            return org;
        });
    }
}

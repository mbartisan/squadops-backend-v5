export default function makeRetrieveUser({ db }) {
  return async function retrieveUser(userId) {
    const user = await db.users.users.query.findOne({ id: userId });
    return user;

    // const [
    //     user,
    //     orgMember
    // ] = await Promise.all([
    //     db.users.users.query.findOne({ id: userId }),
    //     db.orgs.orgs.members.query.findAll({ userId })
    // ]);
    //
    // const orgIds = [];
    // const roleIds = [];
    //
    // orgMember.forEach(member => {
    //     orgIds.push(member.orgId);
    //     roleIds.push(member.roleId);
    // });
    //
    // const [
    //     orgs,
    //     roles,
    // ] = await Promise.all([
    //     db.orgs.orgs.query.findAll({ id: orgIds }),
    //     db.orgs.roles.query.findAll({ id: roleIds }),
    // ]);
    //
    // user.orgs = [];
    //
    // orgMember.forEach(member => {
    //     const org = orgs.find(o => o.id === member.orgId);
    //     const role = roles.find(r => r.id === member.roleId);
    //     user.orgs.push({
    //         ...org,
    //         role
    //     });
    // });
    //
    // return user;
  };
}

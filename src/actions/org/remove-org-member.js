export default function makeRemoveOrgMember({ db }) {
  return async function removeOrgMember({ orgId, userId }) {
    const exists = await db.orgs.orgs.members.query.findOne({ orgId, userId });
    if (!exists) throw new Error('OrgMember does not exist.');

    return db.orgs.orgs.members.query.deleteWhere({ orgId, userId });
  };
}

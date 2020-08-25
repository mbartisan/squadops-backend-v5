export default function makeRemoveOrgTagMember({ db }) {
  return async function removeOrgTagMember({ tagId, userId }) {
    const exists = await db.orgs.tags.members.query.findOne({ tagId, userId });
    if (!exists) throw new Error('OrgTagMember does not exist.');

    return db.orgs.tags.members.query.deleteWhere({ tagId, userId });
  };
}

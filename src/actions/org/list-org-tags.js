export default function makeListOrgTags({ db }) {
  return async function listOrgTags(searchParameters) {
    return await db.orgs.tags.query.findAll(searchParameters);
  };
}

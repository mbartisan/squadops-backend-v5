export default function makeListOrgs({ db }) {
  return async function listOrgs(searchParameters) {
    return await db.orgs.orgs.query.findAll(searchParameters);
  };
}

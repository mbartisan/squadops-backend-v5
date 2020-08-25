export default function makeRetrieveOrg({ db }) {
  return async function retrieveOrg(orgId) {
    const org = await db.orgs.orgs.query.findOne({ id: orgId });
    return org;
  };
}

export default function makeListOrgs({ orgsDb }) {
    return async function listOrgs(searchParameters) {
        return await orgsDb.orgs.query.findAll(searchParameters);
    }
}

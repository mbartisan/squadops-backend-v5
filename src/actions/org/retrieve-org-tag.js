export default function makeRetrieveOrgTag({ db }) {
    return async function retrieveOrgTag(tagId) {
       const tag = await db.orgs.tags.query.findOne({ id: tagId });
        return tag;
    }
}

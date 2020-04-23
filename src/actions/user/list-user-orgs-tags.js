export default function makeListUserOrgsTags({ db }) {
    return async function listUserOrgsTags(searchParameters) {
        const members = await db.orgs.tags.members.query.findAll(searchParameters);

        const tagIds = [];

        members.forEach(member => {
            tagIds.push(member.teamId);
        });

        const [
            tags,
        ] = await Promise.all([
            db.orgs.tags.query.findAll({ id: tagIds }),
        ]);

        return members.map(member => {
            member.tag = tags.find(t => t.id === member.tagId);
            return member;
        });
    }
}

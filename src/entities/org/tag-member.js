export default function buildMakeOrgTagUser() {
  return function makeOrgTagUser(
    {
      tagId,
      userId,
      createdAt = ((Date.now() / 1000).toFixed()),
      updatedAt = ((Date.now() / 1000).toFixed()),
    } = {},
  ) {
    if (!tagId) {
      throw new Error('TagUser must have a teamId.');
    }
    if (!userId) {
      throw new Error('TagUser must have a userId.');
    }

    return Object.freeze({
      getTagId: () => tagId,
      getUserId: () => userId,
      getCreatedAt: () => createdAt,
      getCreatedOn: () => new Date(createdAt * 1000),
      getUpdatedAt: () => updatedAt,
      getUpdatedOn: () => new Date(updatedAt * 1000),
    });
  };
}

export default function buildMakeUserLinkedAccount() {
  return function makeUserLinkedAccount(
    {
      userId,
      key,
      value,
    } = {},
  ) {
    if (!userId) {
      throw new Error('Linked account must have a userId.');
    }

    if (!key) {
      throw new Error('Linked account must have a key.');
    }

    return Object.freeze({
      getUserId: () => userId,
      getKey: () => key,
      getValue: () => value,
    });
  };
}

export default function makePostUserLinkedAccounts({ makeHttpResponse, createLinkedAccount }) {
  return async function postUserLinkedAccounts(httpRequest) {
    try {
      const accountInfo = {
        value: httpRequest.body.value,
        userId: httpRequest.params.userId,
        key: httpRequest.body.key,
      };

      return makeHttpResponse({ statusCode: 201, body: await createLinkedAccount(accountInfo) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

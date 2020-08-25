export default function makeGetUserLinkedAccounts({ makeHttpResponse, listUserLinkedAccounts }) {
  return async function getUserLinkedAccounts(httpRequest) {
    try {
      const search = { ...httpRequest.query };
      if (httpRequest.params && httpRequest.params.userId) search.userId = httpRequest.params.userId;
      if (httpRequest.params && httpRequest.params.key) search.key = httpRequest.params.key;
      const linkedAccounts = await listUserLinkedAccounts(search);
      return makeHttpResponse({ statusCode: 201, body: linkedAccounts });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

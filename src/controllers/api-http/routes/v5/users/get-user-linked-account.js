export default function makeGetUserLinkedAccount({ makeHttpResponse, retrieveUserLinkedAccount }) {
  return async function getUserLinkedAccount(httpRequest) {
    try {
      const linkedAccount = await retrieveUserLinkedAccount(
        httpRequest.params.userId,
        httpRequest.params.key,
      );
      return makeHttpResponse({ statusCode: 201, body: linkedAccount });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

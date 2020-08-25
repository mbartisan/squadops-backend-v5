export default function makeGetOrg({ makeHttpResponse, retrieveOrg }) {
  return async function getOrg(httpRequest) {
    try {
      return makeHttpResponse({ statusCode: 200, body: await retrieveOrg(httpRequest.params.id) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

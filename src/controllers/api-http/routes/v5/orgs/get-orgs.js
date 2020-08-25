export default function makeGetOrgs({ makeHttpResponse, listOrgs }) {
  return async function getOrgs(httpRequest) {
    try {
      const search = {
        ...httpRequest.query,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await listOrgs(search) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

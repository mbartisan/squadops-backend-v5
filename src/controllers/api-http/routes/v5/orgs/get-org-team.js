export default function makeGetOrgTeam({ makeHttpResponse, retrieveOrgTeam }) {
  return async function getOrgTeam(httpRequest) {
    try {
      return makeHttpResponse({
        statusCode: 200,
        body: await retrieveOrgTeam(httpRequest.params.id),
      });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

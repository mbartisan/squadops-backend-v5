export default function makePostOrgTeams({ makeHttpResponse, createOrgTeam }) {
  return async function postOrgTeams(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 201, body: await createOrgTeam(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

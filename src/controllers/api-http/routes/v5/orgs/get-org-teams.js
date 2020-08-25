export default function makeGetOrgTeams({ makeHttpResponse, listOrgTeams }) {
  return async function getOrgTeams(httpRequest) {
    try {
      const search = {
        ...httpRequest.query,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await listOrgTeams(search) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

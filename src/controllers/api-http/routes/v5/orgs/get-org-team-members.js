export default function makeGetOrgTeamMembers({ makeHttpResponse, listOrgTeamMembers }) {
  return async function getOrgTeams(httpRequest) {
    try {
      const search = {
        ...httpRequest.query,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await listOrgTeamMembers(search) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

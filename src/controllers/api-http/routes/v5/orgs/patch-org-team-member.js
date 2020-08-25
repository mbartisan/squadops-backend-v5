export default function makePatchOrgTeamMember({ makeHttpResponse, updateOrgTeamMember }) {
  return async function patchOrgTeamMember(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await updateOrgTeamMember(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

export default function makePatchOrgTeam({ makeHttpResponse, updateOrgTeam }) {
  return async function patchOrgTeam(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await updateOrgTeam(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

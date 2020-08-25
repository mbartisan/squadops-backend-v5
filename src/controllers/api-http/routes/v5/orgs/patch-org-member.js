export default function makePatchOrgMember({ makeHttpResponse, updateOrgMember }) {
  return async function patchOrgMember(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await updateOrgMember(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

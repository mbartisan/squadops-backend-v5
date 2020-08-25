export default function makePostOrgMembers({ makeHttpResponse, createOrgMember }) {
  return async function postOrgMembers(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 201, body: await createOrgMember(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

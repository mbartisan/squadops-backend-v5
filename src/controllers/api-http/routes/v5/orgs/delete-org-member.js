export default function makeDeleteOrgMember({ makeHttpResponse, removeOrgMember }) {
  return async function deleteOrgMember(httpRequest) {
    try {
      const data = {
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await removeOrgMember(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

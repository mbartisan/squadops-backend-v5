export default function makeDeleteOrgTagMember({ makeHttpResponse, removeOrgTagMember }) {
  return async function deleteOrgTagMember(httpRequest) {
    try {
      const data = {
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await removeOrgTagMember(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

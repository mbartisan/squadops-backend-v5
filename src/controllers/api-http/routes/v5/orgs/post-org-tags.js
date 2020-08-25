export default function makePostOrgTags({ makeHttpResponse, createOrgTag }) {
  return async function postOrgTags(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 201, body: await createOrgTag(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

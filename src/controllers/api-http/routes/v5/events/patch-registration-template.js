export default function makePatchRegistrationTemplate({ makeHttpResponse, updateRegistrationTemplate }) {
  return async function patchRegistrationTemplate(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await updateRegistrationTemplate(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

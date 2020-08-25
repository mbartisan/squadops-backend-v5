export default function makeGetRegistrationTemplate({ makeHttpResponse, retrieveRegistrationTemplate }) {
  return async function getRegistrationTemplate(httpRequest) {
    try {
      return makeHttpResponse({
        statusCode: 200,
        body: await retrieveRegistrationTemplate(httpRequest.params.id),
      });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

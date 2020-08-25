export default function makePostEvents({ makeHttpResponse, createEvent }) {
  return async function postEvents(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 201, body: await createEvent(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

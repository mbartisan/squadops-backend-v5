export default function makeGetEventRegistrations({ makeHttpResponse, listEventRegistrations }) {
  return async function getEventRegistrations(httpRequest) {
    try {
      const search = {
        ...httpRequest.query,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await listEventRegistrations(search) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

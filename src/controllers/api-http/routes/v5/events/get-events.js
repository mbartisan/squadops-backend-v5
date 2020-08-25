export default function makeGetEvents({ makeHttpResponse, listEvents }) {
  return async function getEvents(httpRequest) {
    try {
      const search = {
        ...httpRequest.query,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await listEvents(search) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

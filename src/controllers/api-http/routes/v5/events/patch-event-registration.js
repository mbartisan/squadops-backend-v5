export default function makePatchEventRegistration({ makeHttpResponse, updateEventRegistration }) {
  return async function patchEventRegistration(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({ statusCode: 200, body: await updateEventRegistration(data) });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

export default function makePostEventRegistrationSections({ makeHttpResponse, createEventRegistrationSection }) {
  return async function postEventRegistrationSections(httpRequest) {
    try {
      const data = {
        ...httpRequest.body,
        ...httpRequest.params,
      };
      return makeHttpResponse({
        statusCode: 201,
        body: await createEventRegistrationSection(data),
      });
    } catch (e) {
      return makeHttpResponse({ statusCode: 400, body: { error: e.message } });
    }
  };
}

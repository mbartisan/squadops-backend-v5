export default function makeGetEventRegistrationSection({ makeHttpResponse, retrieveEventRegistrationSection }) {
    return async function getEventRegistrationSection(httpRequest) {
        try {
            return makeHttpResponse({ statusCode: 200, body: await retrieveEventRegistrationSection(httpRequest.params.id) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

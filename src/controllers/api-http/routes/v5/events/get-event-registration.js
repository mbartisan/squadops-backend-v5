export default function makeGetEventRegistration({ makeHttpResponse, retrieveEventRegistration }) {
    return async function getEventRegistration(httpRequest) {
        try {
            return makeHttpResponse({ statusCode: 200, body: await retrieveEventRegistration(httpRequest.params.id) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

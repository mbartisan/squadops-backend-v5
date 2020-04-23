export default function makeGetEvent({ makeHttpResponse, retrieveEvent }) {
    return async function getEvent(httpRequest) {
        try {
            return makeHttpResponse({ statusCode: 200, body: await retrieveEvent(httpRequest.params.id) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

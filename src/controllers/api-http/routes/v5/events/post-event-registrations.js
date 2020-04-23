export default function makePostEventRegistrations({ makeHttpResponse, createEventRegistration }) {
    return async function postEventRegistrations(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 201, body: await createEventRegistration(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

export default function makeGetEventRegistrationSections({ makeHttpResponse, listEventRegistrationSections }) {
    return async function getEventRegistrationSections(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await listEventRegistrationSections(search) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

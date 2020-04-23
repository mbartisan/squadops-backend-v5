export default function makePatchEventRegistrationSection({ makeHttpResponse, updateEventRegistrationSection }) {
    return async function patchEventRegistrationSection(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await updateEventRegistrationSection(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

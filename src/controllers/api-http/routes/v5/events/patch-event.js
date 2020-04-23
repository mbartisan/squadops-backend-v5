export default function makePatchEvent({ makeHttpResponse, updateEvent }) {
    return async function patchEvent(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await updateEvent(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

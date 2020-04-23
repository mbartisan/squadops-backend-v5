export default function makePatchOrg({ makeHttpResponse, updateOrg }) {
    return async function patchOrg(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await updateOrg(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

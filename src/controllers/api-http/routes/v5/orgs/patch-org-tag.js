export default function makePatchOrgTag({ makeHttpResponse, updateOrgTag }) {
    return async function patchOrgTag(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await updateOrgTag(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

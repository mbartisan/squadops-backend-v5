export default function makePatchOrgRole({ makeHttpResponse, updateOrgRole }) {
    return async function patchOrgRole(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await updateOrgRole(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

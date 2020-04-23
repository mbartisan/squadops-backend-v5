export default function makeGetOrgMembers({ makeHttpResponse, listOrgMembers }) {
    return async function getOrgMembers(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await listOrgMembers(search) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

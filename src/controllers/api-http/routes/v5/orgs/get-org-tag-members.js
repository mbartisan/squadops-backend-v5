export default function makeGetOrgTagMembers({ makeHttpResponse, listOrgTagMembers }) {
    return async function getOrgTags(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await listOrgTagMembers(search) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

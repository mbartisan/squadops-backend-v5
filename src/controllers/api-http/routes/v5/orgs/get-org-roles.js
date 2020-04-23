export default function makeGetOrgRoles({ makeHttpResponse, listOrgRoles }) {
    return async function getOrgRoles(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await listOrgRoles(search) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

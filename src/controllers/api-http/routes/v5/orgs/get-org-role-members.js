export default function makeGetOrgRoleMembers({ makeHttpResponse, listOrgRoleMembers }) {
    return async function getOrgRoleMembers(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await listOrgRoleMembers(search) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

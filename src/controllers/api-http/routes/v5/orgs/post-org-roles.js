export default function makePostOrgRoles({ makeHttpResponse, createOrgRole }) {
    return async function postOrgRoles(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 201, body: await createOrgRole(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

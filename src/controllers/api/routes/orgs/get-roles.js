export default function makeGetRoles({ makeHTTPResponse, listRoles }) {
    return async function getRoles(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            const roles = await listRoles(search);
            return makeHTTPResponse({ statusCode: 200, body: roles });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

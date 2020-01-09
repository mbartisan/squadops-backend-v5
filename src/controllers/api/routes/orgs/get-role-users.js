export default function makeGetRoleUsers({ makeHTTPResponse, listRoleUsers }) {
    return async function getRoleUsers(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            const users = await listRoleUsers(search);
            return makeHTTPResponse({ statusCode: 200, body: users });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

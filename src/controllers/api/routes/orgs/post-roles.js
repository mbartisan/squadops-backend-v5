export default function makePostRoles({ makeHTTPResponse, addRole }) {
    return async function postRoles(httpRequest) {
        try {
            const roleInfo = {
                ...httpRequest.body,
                ...httpRequest.params
            };

            const createdRole = await addRole(roleInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdRole });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

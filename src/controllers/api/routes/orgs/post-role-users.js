export default function makePostRoleUsers({ makeHTTPResponse, addRoleUser }) {
    return async function postRoleUsers(httpRequest) {
        try {
            const userInfo = {
                ...httpRequest.body,
                ...httpRequest.params
            };

            const createdUser = await addRoleUser(userInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdUser });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

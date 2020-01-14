export default function makePostOrgUsers({ makeHTTPResponse, addOrgUser }) {
    return async function postOrgUsers(httpRequest) {
        try {
            const userInfo = {
                ...httpRequest.body,
                ...httpRequest.params
            };

            const createdUser = await addOrgUser(userInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdUser });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

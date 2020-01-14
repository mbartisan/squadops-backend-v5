export default function makeDeleteOrgUser({ makeHTTPResponse, removeOrgUser }) {
    return async function deleteOrgUser(httpRequest) {
        try {
            const userInfo = {
                ...httpRequest.body,
                ...httpRequest.params
            };

            const createdUser = await removeOrgUser(userInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdUser });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

export default function makePostUser({ makeHTTPResponse, addUser }) {
    return async function postUser(httpRequest) {
        try {
            const userInfo = { ...httpRequest.body };

            const createdUser = await addUser(userInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdUser });
        } catch (e) {
            // TODO: Error logging
            console.error(e);
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

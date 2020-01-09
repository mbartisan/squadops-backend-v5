export default function makePostUsers({ makeHTTPResponse, addUser }) {
    return async function postUsers(httpRequest) {
        try {
            const userInfo = {
                ...httpRequest.body,
                ...httpRequest.params
            };

            const createdUser = await addUser(userInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdUser });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

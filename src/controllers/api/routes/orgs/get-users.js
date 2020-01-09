export default function makeGetUsers({ makeHTTPResponse, listUsers }) {
    return async function getUsers(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            console.log("Get Users Search: ", search);
            const users = await listUsers(search);
            return makeHTTPResponse({ statusCode: 200, body: users });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

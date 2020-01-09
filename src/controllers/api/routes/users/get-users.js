export default function makeGetUsers({ makeHTTPResponse, listUsers }) {
    return async function getUsers(httpRequest) {
        try {
            const search = { ...httpRequest.query };
            if (httpRequest.params && httpRequest.params.id) search.id = httpRequest.params.id;
            const users = await listUsers(search);
            return makeHTTPResponse({ statusCode: 201, body: users });
        } catch (e) {
            // TODO: Error logging
            console.error(e);
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

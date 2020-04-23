export default function makeGetUsers({ makeHttpResponse, listUsers }) {
    return async function getUsers(httpRequest) {
        return makeHttpResponse({ statusCode: 200, body: await listUsers({ ...httpRequest.query }) });
    }
}

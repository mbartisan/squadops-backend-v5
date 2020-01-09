export default function makeGetTeamUsers({ makeHTTPResponse, listTeamUsers }) {
    return async function getTeamUsers(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            const users = await listTeamUsers(search);
            return makeHTTPResponse({ statusCode: 200, body: users });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

export default function makePostTeamUsers({ makeHTTPResponse, addTeamUser }) {
    return async function postTeamUsers(httpRequest) {
        try {
            const userInfo = {
                ...httpRequest.body,
                ...httpRequest.params
            };

            const createdUser = await addTeamUser(userInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdUser });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

export default function makePostTeams({ makeHTTPResponse, addTeam }) {
    return async function postTeams(httpRequest) {
        try {
            const teamInfo = {
                ...httpRequest.body,
                ...httpRequest.params
            };

            const createdTeam = await addTeam(teamInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdTeam });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

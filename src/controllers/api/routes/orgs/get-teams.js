export default function makeGetTeams({ makeHTTPResponse, listTeams }) {
    return async function getTeams(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            const teams = await listTeams(search);
            return makeHTTPResponse({ statusCode: 200, body: teams });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

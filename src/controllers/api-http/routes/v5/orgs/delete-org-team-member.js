export default function makeDeleteOrgTeamMember({ makeHttpResponse, removeOrgTeamMember }) {
    return async function deleteOrgTeamMember(httpRequest) {
        try {
            const data = {
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await removeOrgTeamMember(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

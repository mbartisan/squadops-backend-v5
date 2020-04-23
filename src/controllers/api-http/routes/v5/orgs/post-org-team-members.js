export default function makePostOrgTeamMembers({ makeHttpResponse, createOrgTeamMember }) {
    return async function postOrgTeamMembers(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 201, body: await createOrgTeamMember(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

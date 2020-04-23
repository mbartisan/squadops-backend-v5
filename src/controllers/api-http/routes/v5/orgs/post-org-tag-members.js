export default function makePostOrgTagMembers({ makeHttpResponse, createOrgTagMember }) {
    return async function postOrgTagMembers(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 201, body: await createOrgTagMember(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

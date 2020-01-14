export default function makeGetOrgUsers({ makeHTTPResponse, listOrgUsers }) {
    return async function getOrgUsers(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            console.log("Get Users Search: ", search);
            const users = await listOrgUsers(search);
            return makeHTTPResponse({ statusCode: 200, body: users });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

export default function makeGetOrgs({ makeHTTPResponse, listOrgs }) {
    return async function getOrgs(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            const orgs = await listOrgs(search);
            return makeHTTPResponse({ statusCode: 200, body: orgs });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

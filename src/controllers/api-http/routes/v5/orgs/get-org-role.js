export default function makeGetOrgRole({ makeHttpResponse, retrieveOrgRole }) {
    return async function getOrgRole(httpRequest) {
        try {
            return makeHttpResponse({ statusCode: 200, body: await retrieveOrgRole(httpRequest.params.id) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

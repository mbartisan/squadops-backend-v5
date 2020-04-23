export default function makeGetOrgTag({ makeHttpResponse, retrieveOrgTag }) {
    return async function getOrgTag(httpRequest) {
        try {
            return makeHttpResponse({ statusCode: 200, body: await retrieveOrgTag(httpRequest.params.id) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

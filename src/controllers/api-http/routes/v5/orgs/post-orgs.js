export default function makePostOrgs({ makeHttpResponse, createOrg }) {
    return async function postOrgs(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 201, body: await createOrg(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

export default function makeGetRegistrationTemplates({ makeHttpResponse, listRegistrationTemplates }) {
    return async function getRegistrationTemplates(httpRequest) {
        try {
            const search = {
                ...httpRequest.query,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 200, body: await listRegistrationTemplates(search) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

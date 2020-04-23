export default function makePostRegistrationTemplates({ makeHttpResponse, createRegistrationTemplate }) {
    return async function postRegistrationTemplates(httpRequest) {
        try {
            const data = {
                ...httpRequest.body,
                ...httpRequest.params
            };
            return makeHttpResponse({ statusCode: 201, body: await createRegistrationTemplate(data) });
        } catch (e) {
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

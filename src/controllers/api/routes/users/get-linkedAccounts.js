export default function makeGetLinkedAccounts({ makeHTTPResponse, listLinkedAccounts }) {
    return async function getLinkedAccounts(httpRequest) {
        try {
            const search = { ...httpRequest.query };
            if (httpRequest.params && httpRequest.params.userId) search.userId = httpRequest.params.userId;
            if (httpRequest.params && httpRequest.params.key) search.key = httpRequest.params.key;
            const linkedAccounts = await listLinkedAccounts(search);
            return makeHTTPResponse({ statusCode: 201, body: linkedAccounts });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

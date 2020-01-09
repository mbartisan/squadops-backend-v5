export default function makePatchLinkedAccount({ makeHTTPResponse, editLinkedAccount }) {
    return async function patchLinkedAccount(httpRequest) {
        try {
            const accountInfo = {
                value: httpRequest.body.value,
                userId: httpRequest.params.userId,
                key: httpRequest.params.key
            };

            const updatedAccount = await editLinkedAccount(accountInfo);

            return makeHTTPResponse({ statusCode: 200, body: updatedAccount });
        } catch (e) {
            if (e.name === "RangeError") {
                return makeHTTPResponse({ statusCode: 404, body: { error: e.message }});
            }
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

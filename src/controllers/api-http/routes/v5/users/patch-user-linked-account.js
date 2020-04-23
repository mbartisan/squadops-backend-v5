export default function makePatchUserLinkedAccount({ makeHttpResponse, updateUserLinkedAccount }) {
    return async function patchUserLinkedAccount(httpRequest) {
        try {
            const accountInfo = {
                value: httpRequest.body.value,
                userId: httpRequest.params.userId,
                key: httpRequest.params.key
            };

            const updatedAccount = await updateUserLinkedAccount(accountInfo);

            return makeHttpResponse({ statusCode: 200, body: updatedAccount });
        } catch (e) {
            if (e.name === "RangeError") {
                return makeHttpResponse({ statusCode: 404, body: { error: e.message }});
            }
            return makeHttpResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

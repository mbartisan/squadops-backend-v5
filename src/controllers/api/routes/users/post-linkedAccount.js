export default function makePostLinkedAccount({ makeHTTPResponse, addLinkedAccount  }) {
    return async function postLinkedAccount(httpRequest) {
        try {
            const accountInfo = {
                value: httpRequest.body.value,
                userId: httpRequest.params.userId,
                key: httpRequest.params.key
            };

            const createdLinkedAccount = await addLinkedAccount(accountInfo);

            return makeHTTPResponse({ statusCode: 201, body: createdLinkedAccount });
        } catch (e) {
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

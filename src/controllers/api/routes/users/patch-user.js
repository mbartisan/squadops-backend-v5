export default function makePatchUser({ makeHTTPResponse, editUser }) {
    return async function patchUser(httpRequest) {
        try {
            const userInfo = {
                ...httpRequest.body,
                id: httpRequest.params.id
            };

            const updatedUser = await editUser(userInfo);

            return makeHTTPResponse({ statusCode: 200, body: updatedUser });
        } catch (e) {
            // TODO: Error logging
            console.error(e);
            if (e.name === "RangeError") {
                return makeHTTPResponse({ statusCode: 404, body: { error: e.message }});
            }
            return makeHTTPResponse({ statusCode: 400, body: { error: e.message }});
        }
    }
}

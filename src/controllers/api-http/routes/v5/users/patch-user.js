export default function makePatchUser({ makeHttpResponse, updateUser }) {
    return async function patchUser(httpRequest) {
        return makeHttpResponse({ statusCode: 200, body: await updateUser({ ...httpRequest.body, id: httpRequest.params.id, }) });
    }
}

export default function makePostLogin({ makeHttpResponse, validateLogin }) {
    return async function postLogin(httpRequest) {
        const { valid, userId, accessToken } = await validateLogin({ ...httpRequest.body });
        if (!valid) throw new Error('Invalid login.');
        return makeHttpResponse({ statusCode: 200, body: { valid, userId, accessToken } });
    }
}

export default function makeGetMe({ config, makeHttpResponse, retrieveUser, validateAccessToken }) {
    return async function getMe(httpRequest) {
        let me = null;
        const accessToken = httpRequest.headers[config.headers.accessToken];
        if (accessToken) {
            const userId = await validateAccessToken(accessToken);
            if (userId) me = await retrieveUser(userId);
        }
        return makeHttpResponse({ statusCode: 200, body: me });
    }
}

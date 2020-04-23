export default function makePostMeLogout({ config, makeHttpResponse, removeAccessToken }) {
    return async function postMeLogout(httpRequest) {
        console.log("postMeLogout: ", httpRequest, config);
        const accessToken = httpRequest.headers[config.headers.accessToken];
        await removeAccessToken({ rawToken: accessToken });
        return makeHttpResponse({ statusCode: 200, body: null });
    }
}

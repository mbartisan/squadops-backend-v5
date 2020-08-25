export default function makeGetUser({ makeHttpResponse, retrieveUser }) {
  return async function getUser(httpRequest) {
    return makeHttpResponse({ statusCode: 200, body: await retrieveUser(httpRequest.params.id) });
  };
}

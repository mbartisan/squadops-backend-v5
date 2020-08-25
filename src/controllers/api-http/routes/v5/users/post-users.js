export default function makePostUsers({ makeHttpResponse, createUser }) {
  return async function postUsers(httpRequest) {
    return makeHttpResponse({ statusCode: 200, body: await createUser({ ...httpRequest.body }) });
  };
}

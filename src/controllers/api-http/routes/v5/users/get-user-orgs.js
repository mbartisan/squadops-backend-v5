export default function makeGetUserOrgs({ makeHttpResponse, listUserOrgs }) {
  return async function getUserOrgs(httpRequest) {
    return makeHttpResponse({
      statusCode: 200,
      body: await listUserOrgs({ userId: httpRequest.params.userId }),
    });
  };
}

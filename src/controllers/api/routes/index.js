import makeUsersRouteControllers from "./users/index.js";
import makeOrgsRouteControllers from "./orgs/index.js";

function makeHTTPResponse(responseData) {
    if (responseData.statusCode < 200 || responseData.statusCode > 299) {
        console.error("HTTP Response had a non-200 status code of "+responseData.statusCode+ ". Error: ", responseData.body.error);
    }

    return {
        headers: {
            'Content-Type': 'application/json',
            ...responseData.headers
        },
        statusCode: responseData.statusCode || 200,
        body: responseData.body
    }
}

const users = makeUsersRouteControllers({ makeHTTPResponse });
const orgs = makeOrgsRouteControllers({ makeHTTPResponse });

const routeControllers = Object.freeze({
    users,
    orgs
});

export default routeControllers;
export {
    users,
    orgs
}

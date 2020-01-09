import {
    listUsers,
    addUser,
    editUser,
    listLinkedAccounts,
    addLinkedAccount,
    editLinkedAccount
} from "../../../../actions/user/index.js";

import makeGetUsers from "./get-users.js";
import makePostUser from "./post-users.js";
import makePatchUser from "./patch-user.js";
import makeGetLinkedAccounts from "./get-linkedAccounts.js";
import makePostLinkedAccount from "./post-linkedAccount.js";
import makePatchLinkedAccount from "./patch-linkedAccount.js";

export default function makeUsersRouteControllers({ makeHTTPResponse }) {

    const getUsers = makeGetUsers({ makeHTTPResponse, listUsers });
    const postUser = makePostUser({ makeHTTPResponse, addUser });
    const patchUser = makePatchUser({ makeHTTPResponse, editUser });
    const getLinkedAccounts = makeGetLinkedAccounts({ makeHTTPResponse, listLinkedAccounts });
    const postLinkedAccount = makePostLinkedAccount({ makeHTTPResponse, addLinkedAccount });
    const patchLinkedAccount = makePatchLinkedAccount({ makeHTTPResponse, editLinkedAccount });

    return Object.freeze({
        getUsers,
        postUser,
        patchUser,
        getLinkedAccounts,
        postLinkedAccount,
        patchLinkedAccount
    });
}

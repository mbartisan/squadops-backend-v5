import {
    createAccessToken,
    createUser,
    createUserLinkedAccount,
    listUserLinkedAccounts,
    listUserOrgs,
    listUserOrgsTags,
    listUserOrgsTeams,
    listUsers,
    retrieveUser,
    retrieveUserLinkedAccount,
    removeAccessToken,
    updateUser,
    updateUserLinkedAccount,
    validateAccessToken,
    validateLogin,
} from "../../../../../actions/index.js";

import makeGetUsers from "./get-users.js";
import makePostUsers from "./post-users.js";
import makeGetMe from "./get-me.js";
import makePostMeLogout from "./post-me-logout.js";
import makePostLogin from "./post-login.js";
import makeGetUser from "./get-user.js";
import makePatchUser from "./patch-user.js";
import makeGetUserLinkedAccounts from "./get-user-linked-accounts.js";
import makePostUserLinkedAccounts from "./post-user-linked-accounts.js";
import makeGetUserLinkedAccount from "./get-user-linked-account.js";
import makePatchUserLinkedAccount from "./patch-user-linked-account.js";
import makeGetUserOrgs from "./get-user-orgs.js";

export default function makeUsersRoutes({ config, makeHttpResponse }) {

    const getUsers = makeGetUsers({ makeHttpResponse, listUsers });
    const postUsers = makePostUsers({ makeHttpResponse, createUser });

    const getMe = makeGetMe({ config, makeHttpResponse, retrieveUser, validateAccessToken });
    const postMeLogout = makePostMeLogout({ config, makeHttpResponse, removeAccessToken });
    const postLogin = makePostLogin({ makeHttpResponse, validateLogin });

    const getUser = makeGetUser({ makeHttpResponse, retrieveUser });
    const patchUser = makePatchUser({ makeHttpResponse, updateUser });

    const getUserLinkedAccounts = makeGetUserLinkedAccounts({ makeHttpResponse, listUserLinkedAccounts });
    const postUserLinkedAccounts = makePostUserLinkedAccounts({ makeHttpResponse, createUserLinkedAccount });
    const getUserLinkedAccount = makeGetUserLinkedAccount({ makeHttpResponse, retrieveUserLinkedAccount });
    const patchUserLinkedAccount = makePatchUserLinkedAccount({ makeHttpResponse, updateUserLinkedAccount });

    const getUserOrgs = makeGetUserOrgs({ makeHttpResponse, listUserOrgs });


    return Object.freeze({
        getUsers,
        postUsers,
        getMe,
        postMeLogout,
        postLogin,
        getUser,
        patchUser,
        getUserLinkedAccounts,
        postUserLinkedAccounts,
        getUserLinkedAccount,
        patchUserLinkedAccount,
        getUserOrgs
    });
}

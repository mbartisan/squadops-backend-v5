import makeAddUser from "./add-user.js";
import makeEditUser from "./edit-user.js";
import makeListUsers from "./list-users.js";
import makeAddLinkedAccount from "./add-linkedAccount.js";
import makeEditLinkedAccount from "./edit-linkedAccount.js";
import makeListLinkedAccounts from "./list-linkedAccounts.js";

import {usersDb} from "../../controllers/db/index.js";


const addUser = makeAddUser({ usersDb });
const editUser = makeEditUser({ usersDb });
const listUsers = makeListUsers({ usersDb });

const addLinkedAccount = makeAddLinkedAccount({ usersDb });
const editLinkedAccount = makeEditLinkedAccount({ usersDb });
const listLinkedAccounts = makeListLinkedAccounts({ usersDb });

const userService = Object.freeze({
    addUser,
    editUser,
    listUsers,
    addLinkedAccount,
    editLinkedAccount,
    listLinkedAccounts
});

export default userService;
export {
    addUser,
    editUser,
    listUsers,
    addLinkedAccount,
    editLinkedAccount,
    listLinkedAccounts
};

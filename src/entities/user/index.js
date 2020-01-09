import libMD5 from "js-md5";
import libUUIDv4 from "uuid/v4.js";

import buildMakeUser from "./user.js";
import buildMakeLinkedAccount from "./linkedAccount.js";

const makeLinkedAccount = buildMakeLinkedAccount();
const makeUser = buildMakeUser({ md5, uuid });

export { makeUser, makeLinkedAccount }

function md5(str) {
    return libMD5(str);
}

function uuid() {
    return libUUIDv4();
}

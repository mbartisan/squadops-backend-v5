import {
    listOrgs,
    listUsers,
    addUser,
    listRoles,
    addRole,
    listRoleUsers,
    listTeams,
    listTeamUsers,
    addTeamUser,
    addTeam,
    addRoleUser,
    removeRoleUser
} from "../../../../actions/org/index.js";

import makeGetOrgs from "./get-orgs.js";

import makeGetUsers from "./get-users.js";
import makePostUsers from "./post-users.js";

import makeGetRoles from "./get-roles.js";
import makePostRoles from "./post-roles.js";
import makeGetRoleUsers from "./get-role-users.js";
import makePostRoleUsers from "./post-role-users.js";

import makeGetTeams from "./get-teams.js";
import makeGetTeamUsers from "./get-team-users.js";
import makePostTeams from "./post-teams.js";
import makePostTeamUsers from "./post-team-users.js";
import makeDeleteRoleUser from "./delete-role-users.js";

export default function makeOrgsRouteControllers({ makeHTTPResponse }) {

    const getOrgs = makeGetOrgs({ makeHTTPResponse, listOrgs });

    const getUsers = makeGetUsers({ makeHTTPResponse, listUsers });
    const postUsers = makePostUsers({ makeHTTPResponse, addUser });

    const getRoles = makeGetRoles({ makeHTTPResponse, listRoles });
    const postRoles = makePostRoles({ makeHTTPResponse, addRole });
    const getRoleUsers = makeGetRoleUsers({ makeHTTPResponse, listRoleUsers });
    const postRoleUsers = makePostRoleUsers({ makeHTTPResponse, addRoleUser });
    const deleteRoleUser = makeDeleteRoleUser({ makeHTTPResponse, removeRoleUser });

    const getTeams = makeGetTeams({ makeHTTPResponse, listTeams });
    const postTeams = makePostTeams({ makeHTTPResponse, addTeam });
    const getTeamUsers = makeGetTeamUsers({ makeHTTPResponse, listTeamUsers });
    const postTeamUsers = makePostTeamUsers({ makeHTTPResponse, addTeamUser });

    return Object.freeze({
        getOrgs,
        getUsers,
        postUsers,
        getRoles,
        postRoles,
        getTeams,
        getTeamUsers,
        postTeams,
        postTeamUsers,
        getRoleUsers,
        postRoleUsers,
        deleteRoleUser
    });
}

import makeAddOrg from "./add-org.js";
import makeEditOrg from "./edit-org.js";
import makeListOrgs from "./list-orgs.js";
import makeAddUser from "./add-user.js";
import makeListUsers from "./list-users.js";
import makeAddRole from "./add-role.js";
import makeEditRole from "./edit-role.js";
import makeListRoles from "./list-roles.js";
import makeAddTeam from "./add-team.js";
import makeEditTeam from "./edit-team.js";
import makeListTeams from "./list-teams.js";
import makeListTeamUsers from "./list-team-users.js";
import makeAddRoleUser from "./add-role-user.js";
import makeAddTeamUser from "./add-team-user.js";
import makeEditTeamUser from "./edit-team-user.js";
import makeListRoleUsers from "./list-role-users.js";
import makeRemoveRoleUser from "./remove-role-user.js";

import {orgsDb,usersDb} from "../../controllers/db/index.js";


const addOrg = makeAddOrg({ orgsDb });
const editOrg = makeEditOrg({ orgsDb });
const listOrgs = makeListOrgs({ orgsDb });

const addUser = makeAddUser({ orgsDb });
const listUsers = makeListUsers({ orgsDb, usersDb });

const addRole = makeAddRole({ orgsDb });
const editRole = makeEditRole({ orgsDb });
const listRoles = makeListRoles({ orgsDb });

const listRoleUsers = makeListRoleUsers({ orgsDb, usersDb });
const addRoleUser = makeAddRoleUser({ orgsDb });
const removeRoleUser = makeRemoveRoleUser({ orgsDb });

const addTeam = makeAddTeam({ orgsDb });
const editTeam = makeEditTeam({ orgsDb });
const listTeams = makeListTeams({ orgsDb });

const listTeamUsers = makeListTeamUsers({ orgsDb, usersDb });
const addTeamUser = makeAddTeamUser({ orgsDb });
const editTeamUser = makeEditTeamUser({ orgsDb });

const orgService = Object.freeze({
    addOrg,
    editOrg,
    listOrgs,
    addRole,
    listUsers,
    editRole,
    listRoles,
    addTeam,
    editTeam,
    listTeams,
    listTeamUsers,
    addUser,
    addRoleUser,
    addTeamUser,
    editTeamUser,
    listRoleUsers,
    removeRoleUser
});

export default orgService;
export {
    addOrg,
    editOrg,
    listOrgs,
    addUser,
    listUsers,
    addRole,
    editRole,
    listRoles,
    addTeam,
    editTeam,
    listTeams,
    listTeamUsers,
    addRoleUser,
    addTeamUser,
    editTeamUser,
    listRoleUsers,
    removeRoleUser
};

import buildMakeOrg from "./org.js";
import buildMakeTeam from "./team.js";
import buildMakeRole from "./role.js";
import buildMakeUser from "./user.js";
import buildMakeTeamUser from "./teamUser.js";
import buildMakeRoleUser from "./roleUser.js";

const makeRole = buildMakeRole();
const makeTeam = buildMakeTeam();
const makeOrg = buildMakeOrg();
const makeUser = buildMakeUser();
const makeTeamUser = buildMakeTeamUser();
const makeRoleUser = buildMakeRoleUser();

export {
    makeOrg,
    makeTeam,
    makeRole,
    makeUser,
    makeTeamUser,
    makeRoleUser
}

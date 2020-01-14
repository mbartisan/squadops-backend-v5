import buildMakeOrg from "./org.js";
import buildMakeTeam from "./team.js";
import buildMakeRole from "./role.js";
import buildMakeOrgUser from "./orgUser.js";
import buildMakeTeamUser from "./teamUser.js";
import buildMakeRoleUser from "./roleUser.js";

const makeRole = buildMakeRole();
const makeTeam = buildMakeTeam();
const makeOrg = buildMakeOrg();
const makeOrgUser = buildMakeOrgUser();
const makeTeamUser = buildMakeTeamUser();
const makeRoleUser = buildMakeRoleUser();

export {
    makeOrg,
    makeTeam,
    makeRole,
    makeOrgUser,
    makeTeamUser,
    makeRoleUser
}

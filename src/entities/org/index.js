import buildMakeOrg from "./org.js";
import buildMakeOrgRole from "./org-role.js";
import buildMakeOrgTeam from "./org-team.js";
import buildMakeOrgTag from "./org-tag.js";
import buildMakeOrgMember from "./org-member.js";
import buildMakeTeamMember from "./team-member.js";
import buildMakeTagMember from "./tag-member.js";

const makeOrg = buildMakeOrg();
const makeOrgRole = buildMakeOrgRole();
const makeOrgTeam = buildMakeOrgTeam();
const makeOrgTeamMember = buildMakeTeamMember();
const makeOrgTag = buildMakeOrgTag();
const makeOrgTagMember = buildMakeTagMember();
const makeOrgMember = buildMakeOrgMember();


export {
    makeOrg,
    makeOrgRole,
    makeOrgTeam,
    makeOrgTag,
    makeOrgMember,
    makeOrgTeamMember,
    makeOrgTagMember
}

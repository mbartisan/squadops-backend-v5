import {
  createOrg,
  createOrgMember,
  createOrgRole,
  createOrgTag,
  createOrgTagMember,
  createOrgTeam,
  createOrgTeamMember,
  listOrgMembers,
  listOrgRoles,
  listOrgTagMembers,
  listOrgTags,
  listOrgTeamMembers,
  listOrgTeams,
  listOrgs,
  retrieveOrg,
  retrieveOrgRole,
  retrieveOrgTag,
  retrieveOrgTeam,
  removeOrgMember,
  removeOrgTagMember,
  removeOrgTeamMember,
  updateOrg,
  updateOrgMember,
  updateOrgRole,
  updateOrgTag,
  updateOrgTeam,
  updateOrgTeamMember,
} from '../../../../../actions/index.js';

import makeGetOrgs from './get-orgs.js';
import makePostOrgs from './post-orgs.js';
import makeGetOrg from './get-org.js';
import makePatchOrg from './patch-org.js';
import makeGetOrgMembers from './get-org-members.js';
import makePostOrgMembers from './post-org-members.js';
import makePatchOrgMember from './patch-org-member.js';
import makeDeleteOrgMember from './delete-org-member.js';
import makeGetOrgRoles from './get-org-roles.js';
import makePostOrgRoles from './post-org-roles.js';
import makeGetOrgRole from './get-org-role.js';
import makePatchOrgRole from './patch-org-role.js';
import makeGetOrgRoleMembers from './get-org-role-members.js';
import makeGetOrgTags from './get-org-tags.js';
import makePostOrgTags from './post-org-tags.js';
import makeGetOrgTag from './get-org-tag.js';
import makePatchOrgTag from './patch-org-tag.js';
import makeGetOrgTagMembers from './get-org-tag-members.js';
import makePostOrgTagMembers from './post-org-tag-members.js';
import makeDeleteOrgTagMember from './delete-org-tag-member.js';
import makeGetOrgTeams from './get-org-teams.js';
import makePostOrgTeams from './post-org-teams.js';
import makeGetOrgTeam from './get-org-team.js';
import makePatchOrgTeam from './patch-org-team.js';
import makeGetOrgTeamMembers from './get-org-team-members.js';
import makePostOrgTeamMembers from './post-org-team-members.js';
import makePatchOrgTeamMember from './patch-org-team-member.js';
import makeDeleteOrgTeamMember from './delete-org-team-member.js';

export default function makeOrgsRoutes({ makeHttpResponse }) {
  const getOrgs = makeGetOrgs({ makeHttpResponse, listOrgs });
  const postOrgs = makePostOrgs({ makeHttpResponse, createOrg });
  const getOrg = makeGetOrg({ makeHttpResponse, retrieveOrg });
  const patchOrg = makePatchOrg({ makeHttpResponse, updateOrg });

  const getOrgMembers = makeGetOrgMembers({ makeHttpResponse, listOrgMembers });
  const postOrgMembers = makePostOrgMembers({ makeHttpResponse, createOrgMember });
  const patchOrgMember = makePatchOrgMember({ makeHttpResponse, updateOrgMember });
  const deleteOrgMember = makeDeleteOrgMember({ makeHttpResponse, removeOrgMember });

  const getOrgRoles = makeGetOrgRoles({ makeHttpResponse, listOrgRoles });
  const postOrgRoles = makePostOrgRoles({ makeHttpResponse, createOrgRole });
  const getOrgRole = makeGetOrgRole({ makeHttpResponse, retrieveOrgRole });
  const patchOrgRole = makePatchOrgRole({ makeHttpResponse, updateOrgRole });
  const getOrgRoleMembers = makeGetOrgRoleMembers({ makeHttpResponse, listOrgMembers });

  const getOrgTags = makeGetOrgTags({ makeHttpResponse, listOrgTags });
  const postOrgTags = makePostOrgTags({ makeHttpResponse, createOrgTag });
  const getOrgTag = makeGetOrgTag({ makeHttpResponse, retrieveOrgTag });
  const patchOrgTag = makePatchOrgTag({ makeHttpResponse, updateOrgTag });
  const getOrgTagMembers = makeGetOrgTagMembers({ makeHttpResponse, listOrgTagMembers });
  const postOrgTagMembers = makePostOrgTagMembers({ makeHttpResponse, createOrgTagMember });
  const deleteOrgTagMember = makeDeleteOrgTagMember({ makeHttpResponse, removeOrgTagMember });

  const getOrgTeams = makeGetOrgTeams({ makeHttpResponse, listOrgTeams });
  const postOrgTeams = makePostOrgTeams({ makeHttpResponse, createOrgTeam });
  const getOrgTeam = makeGetOrgTeam({ makeHttpResponse, retrieveOrgTeam });
  const patchOrgTeam = makePatchOrgTeam({ makeHttpResponse, updateOrgTeam });
  const getOrgTeamMembers = makeGetOrgTeamMembers({ makeHttpResponse, listOrgTeamMembers });
  const postOrgTeamMembers = makePostOrgTeamMembers({ makeHttpResponse, createOrgTeamMember });
  const patchOrgTeamMember = makePatchOrgTeamMember({ makeHttpResponse, updateOrgTeamMember });
  const deleteOrgTeamMember = makeDeleteOrgTeamMember({ makeHttpResponse, removeOrgTeamMember });

  return Object.freeze({
    getOrgs,
    postOrgs,
    getOrg,
    patchOrg,
    getOrgMembers,
    postOrgMembers,
    patchOrgMember,
    deleteOrgMember,
    getOrgRoles,
    postOrgRoles,
    getOrgRole,
    patchOrgRole,
    getOrgRoleMembers,
    getOrgTags,
    postOrgTags,
    getOrgTag,
    patchOrgTag,
    getOrgTagMembers,
    postOrgTagMembers,
    deleteOrgTagMember,
    getOrgTeams,
    postOrgTeams,
    getOrgTeam,
    patchOrgTeam,
    getOrgTeamMembers,
    postOrgTeamMembers,
    patchOrgTeamMember,
    deleteOrgTeamMember,
  });
}

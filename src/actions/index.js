import makeCreateAccessToken from './user/create-access-token.js';
import makeCreateUser from './user/create-user.js';
import makeCreateUserLinkedAccount from './user/create-user-linked-account.js';
import makeListUserLinkedAccounts from './user/list-user-linked-accounts.js';
import makeListUserOrgs from './user/list-user-orgs.js';
import makeListUserOrgsTags from './user/list-user-orgs-tags.js';
import makeListUserOrgsTeams from './user/list-user-orgs-teams.js';
import makeListUsers from './user/list-users.js';
import makeRetrieveUser from './user/retrieve-user.js';
import makeRetrieveUserLinkedAccount from './user/retrieve-user-linked-account.js';
import makeRemoveAccessToken from './user/remove-access-token.js';
import makeUpdateUser from './user/update-user.js';
import makeUpdateUserLinkedAccount from './user/update-user-linked-account.js';
import makeValidateAccessToken from './user/validate-access-token.js';
import makeValidateLogin from './user/validate-login.js';

import makeCreateOrg from './org/create-org.js';
import makeCreateOrgMember from './org/create-org-member.js';
import makeCreateOrgRole from './org/create-org-role.js';
import makeCreateOrgTag from './org/create-org-tag.js';
import makeCreateOrgTagMember from './org/create-org-tag-member.js';
import makeCreateOrgTeam from './org/create-org-team.js';
import makeCreateOrgTeamMember from './org/create-org-team-member.js';
import makeListOrgMembers from './org/list-org-members.js';
import makeListOrgRoles from './org/list-org-roles.js';
import makeListOrgTagMembers from './org/list-org-tag-members.js';
import makeListOrgTags from './org/list-org-tags.js';
import makeListOrgTeamMembers from './org/list-org-team-members.js';
import makeListOrgTeams from './org/list-org-teams.js';
import makeListOrgs from './org/list-orgs.js';
import makeRetrieveOrg from './org/retrieve-org.js';
import makeRetrieveOrgRole from './org/retrieve-org-role.js';
import makeRetrieveOrgTag from './org/retrieve-org-tag.js';
import makeRetrieveOrgTeam from './org/retrieve-org-team.js';
import makeRemoveOrgMember from './org/remove-org-member.js';
import makeRemoveOrgTagMember from './org/remove-org-tag-member.js';
import makeRemoveOrgTeamMember from './org/remove-org-team-member.js';
import makeUpdateOrg from './org/update-org.js';
import makeUpdateOrgMember from './org/update-org-member.js';
import makeUpdateOrgRole from './org/update-org-role.js';
import makeUpdateOrgTag from './org/update-org-tag.js';
import makeUpdateOrgTeam from './org/update-org-team.js';
import makeUpdateOrgTeamMember from './org/update-org-team-member.js';

import makeCreateEvent from './event/create-event.js';
import makeCreateEventRegistration from './event/create-event-registration.js';
import makeCreateEventRegistrationSection from './event/create-event-registration-section.js';
import makeCreateRegistrationTemplate from './event/create-registration-template.js';
import makeListEventRegistrationSections from './event/list-event-registration-sections.js';
import makeListEventRegistrations from './event/list-event-registrations.js';
import makeListEvents from './event/list-events.js';
import makeListRegistrationTemplates from './event/list-registration-templates.js';
import makeRetrieveEvent from './event/retrieve-event.js';
import makeRetrieveEventRegistration from './event/retrieve-event-registration.js';
import makeRetrieveEventRegistrationSection from './event/retrieve-event-registration-section.js';
import makeRetrieveRegistrationTemplate from './event/retrieve-registration-template.js';
import makeUpdateEvent from './event/update-event.js';
import makeUpdateEventRegistration from './event/update-event-registration.js';
import makeUpdateEventRegistrationSection from './event/update-event-registration-section.js';
import makeUpdateRegistrationTemplate from './event/update-registration-template.js';

import db from '../controllers/db/index.js';

const createAccessToken = makeCreateAccessToken({ db });
const createUser = makeCreateUser({ db });
const createUserLinkedAccount = makeCreateUserLinkedAccount({ db });
const listUserLinkedAccounts = makeListUserLinkedAccounts({ db });
const listUserOrgs = makeListUserOrgs({ db });
const listUserOrgsTags = makeListUserOrgsTags({ db });
const listUserOrgsTeams = makeListUserOrgsTeams({ db });
const listUsers = makeListUsers({ db });
const retrieveUser = makeRetrieveUser({ db });
const retrieveUserLinkedAccount = makeRetrieveUserLinkedAccount({ db });
const removeAccessToken = makeRemoveAccessToken({ db });
const updateUser = makeUpdateUser({ db });
const updateUserLinkedAccount = makeUpdateUserLinkedAccount({ db });
const validateAccessToken = makeValidateAccessToken({ db });
const validateLogin = makeValidateLogin({ db, createAccessToken });

const createOrgMember = makeCreateOrgMember({ db });
const createOrgRole = makeCreateOrgRole({ db });
const createOrgTag = makeCreateOrgTag({ db });
const createOrgTagMember = makeCreateOrgTagMember({ db });
const createOrgTeam = makeCreateOrgTeam({ db });
const createOrgTeamMember = makeCreateOrgTeamMember({ db });
const createOrg = makeCreateOrg({ db, createOrgRole, createOrgMember });
const listOrgMembers = makeListOrgMembers({ db });
const listOrgRoles = makeListOrgRoles({ db });
const listOrgTagMembers = makeListOrgTagMembers({ db });
const listOrgTags = makeListOrgTags({ db });
const listOrgTeamMembers = makeListOrgTeamMembers({ db });
const listOrgTeams = makeListOrgTeams({ db });
const listOrgs = makeListOrgs({ db });
const retrieveOrg = makeRetrieveOrg({ db });
const retrieveOrgRole = makeRetrieveOrgRole({ db });
const retrieveOrgTag = makeRetrieveOrgTag({ db });
const retrieveOrgTeam = makeRetrieveOrgTeam({ db });
const removeOrgMember = makeRemoveOrgMember({ db });
const removeOrgTagMember = makeRemoveOrgTagMember({ db });
const removeOrgTeamMember = makeRemoveOrgTeamMember({ db });
const updateOrg = makeUpdateOrg({ db });
const updateOrgMember = makeUpdateOrgMember({ db });
const updateOrgRole = makeUpdateOrgRole({ db });
const updateOrgTag = makeUpdateOrgTag({ db });
const updateOrgTeam = makeUpdateOrgTeam({ db });
const updateOrgTeamMember = makeUpdateOrgTeamMember({ db });

const createEvent = makeCreateEvent({ db });
const createEventRegistration = makeCreateEventRegistration({ db });
const createEventRegistrationSection = makeCreateEventRegistrationSection({ db });
const createRegistrationTemplate = makeCreateRegistrationTemplate({ db });
const listEventRegistrationSections = makeListEventRegistrationSections({ db });
const listEventRegistrations = makeListEventRegistrations({ db });
const listEvents = makeListEvents({ db });
const listRegistrationTemplates = makeListRegistrationTemplates({ db });
const retrieveEvent = makeRetrieveEvent({ db });
const retrieveEventRegistration = makeRetrieveEventRegistration({ db });
const retrieveEventRegistrationSection = makeRetrieveEventRegistrationSection({ db });
const retrieveRegistrationTemplate = makeRetrieveRegistrationTemplate({ db });
const updateEvent = makeUpdateEvent({ db });
const updateEventRegistration = makeUpdateEventRegistration({ db });
const updateEventRegistrationSection = makeUpdateEventRegistrationSection({ db });
const updateRegistrationTemplate = makeUpdateRegistrationTemplate({ db });

// todo: removeUserLinkedAccount

// todo: retrieveOrgMember - do we need this?
// todo: retrieveOrgTagMember - do we need this?
// todo: retrieveOrgTeamMember - do we need this?

// todo: removeEvent
// todo: removeRegistrationTemplate
// todo: removeEventRegistration (unregisterFromEvent)

const actions = Object.freeze({
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

  createEvent,
  createEventRegistration,
  createEventRegistrationSection,
  createRegistrationTemplate,
  listEventRegistrationSections,
  listEventRegistrations,
  listEvents,
  listRegistrationTemplates,
  retrieveEvent,
  retrieveEventRegistration,
  retrieveEventRegistrationSection,
  retrieveRegistrationTemplate,
  updateEvent,
  updateEventRegistration,
  updateEventRegistrationSection,
  updateRegistrationTemplate,
});

export default actions;

export {
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

  createEvent,
  createEventRegistration,
  createEventRegistrationSection,
  createRegistrationTemplate,
  listEventRegistrationSections,
  listEventRegistrations,
  listEvents,
  listRegistrationTemplates,
  retrieveEvent,
  retrieveEventRegistration,
  retrieveEventRegistrationSection,
  retrieveRegistrationTemplate,
  updateEvent,
  updateEventRegistration,
  updateEventRegistrationSection,
  updateRegistrationTemplate,
};

import makeUsersRoutes from "./users/index.js";
import makeOrgsRoutes from "./orgs/index.js";
import makeEventsRoutes from "./events/index.js";
import makeExpressCallback from "../../express-adapter.js";

export default function makeV5Router({ config, router }) {


    const usersRoutes = makeUsersRoutes({ config, makeHttpResponse });
    const orgsRoutes = makeOrgsRoutes({ config, makeHttpResponse });
    const eventsRoutes = makeEventsRoutes({ config, makeHttpResponse });

    router.get('/users', makeCallback(usersRoutes.getUsers));
    router.post('/users', makeCallback(usersRoutes.postUsers));

    router.get('/users/@me', makeCallback(usersRoutes.getMe));
    // router.patch('/users/@me', makeCallback(usersRoutes.patchMe)); // todo
    router.post('/users/@me/logout', makeCallback(usersRoutes.postMeLogout));
    router.post('/users/login', makeCallback(usersRoutes.postLogin));

    router.get('/users/:id', makeCallback(usersRoutes.getUser));
    router.patch('/users/:id', makeCallback(usersRoutes.patchUser));

    router.get('/users/:id/linked-accounts', makeCallback(usersRoutes.getUserLinkedAccounts));
    router.post('/users/:id/linked-accounts', makeCallback(usersRoutes.postUserLinkedAccounts));
    router.get('/users/:userId/linked-accounts/:key', makeCallback(usersRoutes.getUserLinkedAccount));
    router.patch('/users/:userId/linked-accounts/:key', makeCallback(usersRoutes.patchUserLinkedAccount));
// router.delete('/users/:userId/linked-accounts/:key', makeCallback(usersRoutes.deleteUserLinkedAccount)); // todo

    router.get('/users/:userId/orgs', makeCallback(usersRoutes.getUserOrgs));


    router.get('/orgs', makeCallback(orgsRoutes.getOrgs));
    router.post('/orgs', makeCallback(orgsRoutes.postOrgs));
    router.get('/orgs/:id', makeCallback(orgsRoutes.getOrg));
    router.patch('/orgs/:id', makeCallback(orgsRoutes.patchOrg));

    router.get('/orgs/:id/members', makeCallback(orgsRoutes.getOrgMembers));
    router.post('/orgs/:id/members', makeCallback(orgsRoutes.postOrgMembers));
    router.patch('/orgs/:orgId/members/:userId', makeCallback(orgsRoutes.patchOrgMember));
    router.delete('/orgs/:orgId/members/:userId', makeCallback(orgsRoutes.deleteOrgMember));

    router.get('/orgs/:orgId/roles', makeCallback(orgsRoutes.getOrgRoles));
    router.post('/orgs/:orgId/roles', makeCallback(orgsRoutes.postOrgRoles));
    router.get('/orgs/:orgId/role/:id', makeCallback(orgsRoutes.getOrgRole));
    router.patch('/orgs/:orgId/roles/:id', makeCallback(orgsRoutes.patchOrgRole));
    router.get('/orgs/:orgId/roles/:id/members', makeCallback(orgsRoutes.getOrgRoleMembers));

    router.get('/orgs/:orgId/tags', makeCallback(orgsRoutes.getOrgTags));
    router.post('/orgs/:orgId/tags', makeCallback(orgsRoutes.postOrgTags));
    router.get('/orgs/:orgId/tags/:id', makeCallback(orgsRoutes.getOrgTag));
    router.patch('/orgs/:orgId/tags/:id', makeCallback(orgsRoutes.patchOrgTag));
    router.get('/orgs/:orgId/tags/:tagId/members', makeCallback(orgsRoutes.getOrgTagMembers));
    router.post('/orgs/:orgId/tags/:tagId/members', makeCallback(orgsRoutes.postOrgTagMembers));
    router.delete('/orgs/:orgId/tags/:tagId/members/:userId', makeCallback(orgsRoutes.deleteOrgTagMember));

    router.get('/orgs/:orgId/teams', makeCallback(orgsRoutes.getOrgTeams));
    router.post('/orgs/:orgId/teams', makeCallback(orgsRoutes.postOrgTeams));
    router.get('/orgs/:orgId/teams/:id', makeCallback(orgsRoutes.getOrgTeam));
    router.patch('/orgs/:orgId/teams/:id', makeCallback(orgsRoutes.patchOrgTeam));
    router.get('/orgs/:orgId/teams/:teamId/members', makeCallback(orgsRoutes.getOrgTeamMembers));
    router.post('/orgs/:orgId/teams/:teamId/members', makeCallback(orgsRoutes.postOrgTeamMembers));
    router.patch('/orgs/:orgId/teams/:teamId/members/:userId', makeCallback(orgsRoutes.patchOrgTeamMember));
    router.delete('/orgs/:orgId/teams/:teamId/members/:userId', makeCallback(orgsRoutes.deleteOrgTeamMember));


    router.get('/events', makeCallback(eventsRoutes.getEvents));
    router.post('/events', makeCallback(eventsRoutes.postEvents));
    router.get('/events/:id', makeCallback(eventsRoutes.getEvent));
    router.patch('/events/:id', makeCallback(eventsRoutes.patchEvent));

    router.get('/events/:eventId/registration-sections', makeCallback(eventsRoutes.getEventRegistrationSections));
    router.post('/events/:eventId/registration-sections', makeCallback(eventsRoutes.postEventRegistrationSections));
    router.get('/events/:eventId/registration-sections/:id', makeCallback(eventsRoutes.getEventRegistrationSection));
    router.patch('/events/:eventId/registration-sections/:id', makeCallback(eventsRoutes.patchEventRegistrationSection));

    router.get('/events/:eventId/registrations', makeCallback(eventsRoutes.getEventRegistrations));
    router.post('/events/:eventId/registrations', makeCallback(eventsRoutes.postEventRegistrations));
    router.get('/events/:eventId/registrations/:id', makeCallback(eventsRoutes.getEventRegistration));
    router.patch('/events/:eventId/registrations/:id', makeCallback(eventsRoutes.patchEventRegistration));

    router.get('/events/:eventId/registration-sections/:sectionId/registrations', makeCallback(eventsRoutes.getEventRegistrations));
    router.post('/events/:eventId/registration-sections/:sectionId/registrations', makeCallback(eventsRoutes.postEventRegistrations));
    router.get('/events/:eventId/registration-sections/:sectionId/registrations/:id', makeCallback(eventsRoutes.getEventRegistration));
    router.patch('/events/:eventId/registration-sections/:sectionId/registrations/:id', makeCallback(eventsRoutes.patchEventRegistration));

    router.get('/registration-templates', makeCallback(eventsRoutes.getRegistrationTemplates));
    router.post('/registration-templates', makeCallback(eventsRoutes.postRegistrationTemplates));
    router.get('/registration-templates/:id', makeCallback(eventsRoutes.getRegistrationTemplate));
    router.patch('/registration-templates/:id', makeCallback(eventsRoutes.patchRegistrationTemplate));


    return router;
}

function makeCallback(routeController) {
    return makeExpressCallback(routeController);
}

function makeHttpResponse(responseData) {
    if (responseData.statusCode < 200 || responseData.statusCode > 299) {
        console.error("HTTP Response had a non-200 status code of "+responseData.statusCode+ ". Error: ", responseData.body.error);
    }

    return {
        headers: {
            'Content-Type': 'application/json',
            ...responseData.headers
        },
        statusCode: responseData.statusCode || 200,
        body: responseData.body
    }
}

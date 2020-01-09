import express from "express";
import makeExpressCallback from "./express-adapter.js";
import {users,orgs} from "./routes/index.js";

const router = new express.Router();

router.get('/users', makeExpressCallback(users.getUsers));
router.get('/users/:id', makeExpressCallback(users.getUsers));
router.post('/users', makeExpressCallback(users.postUser));
router.patch('/users/:id', makeExpressCallback(users.patchUser));

router.get('/users/:userId/linked-accounts', makeExpressCallback(users.getLinkedAccounts));
router.get('/users/:userId/linked-accounts/:key', makeExpressCallback(users.getLinkedAccounts));
router.post('/users/:userId/linked-accounts/:key', makeExpressCallback(users.postLinkedAccount));
router.patch('/users/:userId/linked-accounts/:key', makeExpressCallback(users.patchLinkedAccount));

router.get('/orgs', makeExpressCallback(orgs.getOrgs));
router.get('/orgs/:id', makeExpressCallback(orgs.getOrgs));

router.get('/orgs/:orgId/users', makeExpressCallback(orgs.getUsers));
router.get('/orgs/:orgId/users/:userId', makeExpressCallback(orgs.getUsers));
router.post('/orgs/:orgId/users', makeExpressCallback(orgs.postUsers));

router.get('/orgs/:orgId/roles', makeExpressCallback(orgs.getRoles));
router.post('/orgs/:orgId/roles', makeExpressCallback(orgs.postRoles));
router.get('/orgs/:orgId/roles/:id', makeExpressCallback(orgs.getRoles));
router.get('/orgs/:orgId/roles/:roleId/users', makeExpressCallback(orgs.getRoleUsers));
router.get('/orgs/:orgId/roles/:roleId/users/:userId', makeExpressCallback(orgs.getRoleUsers));
router.post('/orgs/:orgId/roles/:roleId/users', makeExpressCallback(orgs.postRoleUsers));
router.delete('/orgs/:orgId/roles/:roleId/users/:userId', makeExpressCallback(orgs.deleteRoleUser));

router.get('/orgs/:orgId/teams', makeExpressCallback(orgs.getTeams));
router.post('/orgs/:orgId/teams', makeExpressCallback(orgs.postTeams));
router.get('/orgs/:orgId/teams/:id', makeExpressCallback(orgs.getTeams));
router.get('/orgs/:orgId/teams/:teamId/users', makeExpressCallback(orgs.getTeamUsers));
router.get('/orgs/:orgId/teams/:teamId/users/:userId', makeExpressCallback(orgs.getTeamUsers));
router.post('/orgs/:orgId/teams/:teamId/users', makeExpressCallback(orgs.postTeamUsers));

export default router;

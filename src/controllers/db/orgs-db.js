export default function makeOrgsDb({ makeTable }) {

    const orgs = makeTable("orgs", {
        columns: [
            {key: "id", dataType: "int(11)", autoIncrement: true, primary: true},
            {key: "ownerId", dataType: "int(11)", index: true},
            {key: "name", dataType: "varchar(255)"},
            {key: "icon", dataType: "varchar(255)", null: true},
            {key: "createdAt", dataType: "int(11)"},
            {key: "updatedAt", dataType: "int(11)"},
        ]
    });

    const roles = makeTable("org_roles", {
        columns: [
            {key: "id", dataType: "int(11)", autoIncrement: true, primary: true},
            {key: "orgId", dataType: "int(11)", index: true},
            {key: "name", dataType: "varchar(255)"},
            {key: "createdAt", dataType: "int(11)"},
            {key: "updatedAt", dataType: "int(11)"},
        ]
    });

    const teams = makeTable("org_teams", {
        columns: [
            {key: "id", dataType: "int(11)", autoIncrement: true, primary: true},
            {key: "orgId", dataType: "int(11)", index: true},
            {key: "name", dataType: "varchar(255)"},
            {key: "color", dataType: "varchar(255)", null: true},
            {key: "icon", dataType: "varchar(255)", null: true},
            {key: "createdAt", dataType: "int(11)"},
            {key: "updatedAt", dataType: "int(11)"},
        ]
    });

    const orgUsers = makeTable("org_users_map", {
        columns: [
            {key: "orgId", dataType: "int(11)", index: true},
            {key: "userId", dataType: "int(11)", index: true},
            {key: "createdAt", dataType: "int(11)"},
        ],
        indexes: [
            { id: ["orgId", "userId"], type: "primary" }
        ]
    });

    const roleUsers = makeTable("org_role_users_map", {
        columns: [
            {key: "roleId", dataType: "int(11)", index: true},
            {key: "userId", dataType: "int(11)", index: true},
            {key: "orgId", dataType: "int(11)", index: true},
            {key: "createdAt", dataType: "int(11)"},
        ],
        indexes: [
            { id: ["roleId", "userId"], type: "primary" }
        ]
    });

    const teamUsers = makeTable("org_team_users_map", {
        columns: [
            {key: "teamId", dataType: "int(11)", index: true},
            {key: "userId", dataType: "int(11)", index: true},
            {key: "orgId", dataType: "int(11)", index: true},
            {key: "isLeader", dataType: "tinyint(1)"},
            {key: "createdAt", dataType: "int(11)"},
            {key: "updatedAt", dataType: "int(11)"},
        ],
        indexes: [
            { id: ["teamId", "userId"], type: "primary" }
        ]
    });

    return Object.freeze({
        orgs: {
            ...orgs,
            getByOwnerId: getOrgsByOwnerId,
            searchByName: searchByNameGenerator(orgs)
        },
        teams: {
            ...teams,
            getByOrgId: getByOrgIdGenerator(teams),
            searchByName: searchByNameGenerator(teams)
        },
        roles: {
            ...roles,
            getByOrgId: getByOrgIdGenerator(roles),
            searchByName: searchByNameGenerator(roles)
        },
        orgUsers: {
            ...orgUsers,
            getByUserId: getByUserIdGenerator(orgUsers, "orgId"),
            getByOrgId: getByOrgIdGenerator(orgUsers),
        },
        teamUsers: {
            ...teamUsers,
            getByUserId: getByUserIdGenerator(teamUsers, "teamId"),
            getByOrgId: getByOrgIdGenerator(teamUsers),
            getByTeamId: getTeamUsersByTeamId,
            searchByName: searchByNameGenerator(teamUsers)
        },
        roleUsers: {
            ...roleUsers,
            getByUserId: getByUserIdGenerator(roleUsers, "roleId"),
            getByOrgId: getByOrgIdGenerator(roleUsers),
            getByRoleId: getRoleUsersByRoleId,
            searchByName: searchByNameGenerator(roleUsers)
        }
    });

    function getByOrgIdGenerator(table) {
        return async function getByOrgId(orgId) {
            return table.query.findAll({ orgId });
        }
    }

    function searchByNameGenerator(table) {
        return async function searchByName(name, props, opts) {
            return table.query.search('name', name, props, opts);
        }
    }

    function getByUserIdGenerator(table, tableKey) {
        return async function getByUserId(id, userId) {
            return table.query.findOne({ [tableKey]: id, userId });
        }
    }

    async function getOrgsByOwnerId(ownerId) {
        return orgs.query.findAll({ownerId});
    }

    async function getTeamUsersByTeamId(teamId) {
        return teams.query.findAll({teamId});
    }

    async function getRoleUsersByRoleId(roleId) {
        return roles.query.findAll({roleId});
    }


}

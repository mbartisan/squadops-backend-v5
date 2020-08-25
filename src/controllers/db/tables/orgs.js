export default function makeOrgsDb({ makeTable }) {
  const orgs = makeTable('orgs', {
    columns: [
      {
        key: 'id', dataType: 'int(11)', autoIncrement: true, primary: true,
      },
      { key: 'ownerId', dataType: 'int(11)', index: true },
      { key: 'name', dataType: 'varchar(255)' },
      { key: 'iconUrl', dataType: 'varchar(255)', null: true },
      { key: 'createdAt', dataType: 'int(11)' },
      { key: 'updatedAt', dataType: 'int(11)' },
    ],
  });

  const roles = makeTable('org_roles', {
    columns: [
      {
        key: 'id', dataType: 'int(11)', autoIncrement: true, primary: true,
      },
      { key: 'orgId', dataType: 'int(11)', index: true },
      { key: 'name', dataType: 'varchar(255)' },
      { key: 'createdAt', dataType: 'int(11)' },
      { key: 'updatedAt', dataType: 'int(11)' },
    ],
  });

  const teams = makeTable('org_teams', {
    columns: [
      {
        key: 'id', dataType: 'int(11)', autoIncrement: true, primary: true,
      },
      { key: 'orgId', dataType: 'int(11)', index: true },
      { key: 'name', dataType: 'varchar(255)' },
      { key: 'color', dataType: 'varchar(255)', null: true },
      { key: 'icon', dataType: 'varchar(255)', null: true },
      { key: 'createdAt', dataType: 'int(11)' },
      { key: 'updatedAt', dataType: 'int(11)' },
    ],
  });

  const tags = makeTable('org_tags', {
    columns: [
      {
        key: 'id', dataType: 'int(11)', autoIncrement: true, primary: true,
      },
      { key: 'orgId', dataType: 'int(11)', index: true },
      { key: 'name', dataType: 'varchar(255)' },
      { key: 'createdAt', dataType: 'int(11)' },
      { key: 'updatedAt', dataType: 'int(11)' },
    ],
  });

  const orgMembers = makeTable('org_member_map', {
    columns: [
      { key: 'orgId', dataType: 'int(11)', index: true },
      { key: 'userId', dataType: 'int(11)', index: true },
      { key: 'roleId', dataType: 'int(11)', index: true },
      { key: 'createdAt', dataType: 'int(11)' },
    ],
    indexes: [
      { id: ['orgId', 'userId'], type: 'primary' },
    ],
  });

  const teamMembers = makeTable('org_team_member_map', {
    columns: [
      { key: 'teamId', dataType: 'int(11)', index: true },
      { key: 'userId', dataType: 'int(11)', index: true },
      { key: 'isLeader', dataType: 'tinyint(1)' },
      { key: 'createdAt', dataType: 'int(11)' },
      { key: 'updatedAt', dataType: 'int(11)' },
    ],
    indexes: [
      { id: ['teamId', 'userId'], type: 'primary' },
    ],
  });

  const tagMembers = makeTable('org_tag_member_map', {
    columns: [
      { key: 'tagId', dataType: 'int(11)', index: true },
      { key: 'userId', dataType: 'int(11)', index: true },
      { key: 'createdAt', dataType: 'int(11)' },
      { key: 'updatedAt', dataType: 'int(11)' },
    ],
    indexes: [
      { id: ['tagId', 'userId'], type: 'primary' },
    ],
  });

  return Object.freeze({
    orgs: {
      ...orgs,
      getByOwnerId: getOrgsByOwnerId,
      searchByName: searchByNameGenerator(orgs),
      members: {
        ...orgMembers,
        getByUserId: getByUserIdGenerator(orgMembers, 'orgId'),
        getByOrgId: getByOrgIdGenerator(orgMembers),
      },
    },
    roles: {
      ...roles,
      getByOrgId: getByOrgIdGenerator(roles),
      searchByName: searchByNameGenerator(roles),
      members: {
        ...orgMembers,
        getByUserId: async function getByUserId(userId) {
          return orgMembers.query.findAll({ userId });
        },
        getByRoleId: async function getByRoleId(roleId) {
          return orgMembers.query.findAll({ roleId });
        },
      },
    },
    teams: {
      ...teams,
      getByOrgId: getByOrgIdGenerator(teams),
      searchByName: searchByNameGenerator(teams),
      members: {
        ...teamMembers,
        getByUserId: getByUserIdGenerator(teamMembers, 'teamId'),
        getByOrgId: getByOrgIdGenerator(teamMembers),
        getByTeamId: getTeamUsersByTeamId,
        searchByName: searchByNameGenerator(teamMembers),
      },
    },
    tags: {
      ...tags,
      members: {
        ...tagMembers,
        getByUserId: getByUserIdGenerator(tagMembers, 'teamId'),
        getByOrgId: getByOrgIdGenerator(tagMembers),
        getByTeamId: getTeamUsersByTeamId,
        searchByName: searchByNameGenerator(tagMembers),
      },
    },
  });

  function getByOrgIdGenerator(table) {
    return async function getByOrgId(orgId) {
      return table.query.findAll({ orgId });
    };
  }

  function searchByNameGenerator(table) {
    return async function searchByName(name, props, opts) {
      return table.query.search('name', name, props, opts);
    };
  }

  function getByUserIdGenerator(table, tableKey) {
    return async function getByUserId(id, userId) {
      return table.query.findOne({ [tableKey]: id, userId });
    };
  }

  async function getOrgsByOwnerId(ownerId) {
    return orgs.query.findAll({ ownerId });
  }

  async function getTeamUsersByTeamId(teamId) {
    return teamUsers.query.findAll({ teamId });
  }

  async function getTagUsersByTagId(tagId) {
    return tagUsers.query.findAll({ tagId });
  }

  // async function getRoleUsersByRoleId(roleId) {
  //     return roleUsers.query.findAll({roleId});
  // }
}

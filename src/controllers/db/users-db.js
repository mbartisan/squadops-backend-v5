export default function makeUsersDb({ makeTable }) {

    const users = makeTable("users", {
        columns: [
            { key: "id", dataType: "int(11)", autoIncrement: true, primary: true },
            { key: "name", dataType: "varchar(191)", index: true },
            { key: "email", dataType: "varchar(191)", unique: true },
            { key: "identity", dataType: "varchar(191)", unique: true },
            { key: "createdAt", dataType: "int(11)" },
            { key: "updatedAt", dataType: "int(11)" },
        ]
    });

    const linkedAccounts = makeTable("users_linked_accounts", {
        columns: [
            { key: "userId", dataType: "int(11)", index: true },
            { key: "key", dataType: "varchar(191)", index: true },
            { key: "value", dataType: "varchar(255)" },
        ],
        indexes: [
            { id: ["userId", "key"], type: "primary" }
        ]
    });

    return Object.freeze({
        users: {
            ...users,
            getByIdentity,
            getByName,
            getByEmail,
            searchByName,
            searchByEmail
        },
        linkedAccounts: linkedAccounts
    });

    async function getByIdentity(identity, props) {
        return users.query.findOne({ identity }, props);
    }

    async function getByName(name, props) {
        return users.query.findOne({ name }, props);
    }

    async function getByEmail(email, props) {
        return users.query.findOne({ email }, props);
    }

    async function searchByName(name, props, opts) {
        return users.query.search("name", name, props, opts);
    }

    async function searchByEmail(email, props, opts) {
        return users.query.search("email", email, props, opts);
    }
}

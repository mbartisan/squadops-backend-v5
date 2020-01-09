import makeUsersDb from './users-db.js'
import makeOrgsDb from "./orgs-db.js";
import mysql from 'mysql2'

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DB;
const CREATE_TABLES = process.env.MYSQL_CREATE_TABLES || false;

const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0 // 0 = unlimited
});

const usersDb = makeUsersDb({ makeTable });
const orgsDb = makeOrgsDb({ makeTable });

const dbControllers = Object.freeze({
    usersDb,
    orgsDb
});

export default dbControllers;
export {
    usersDb,
    orgsDb
};

export function makeTable(tableName, schema) {
    if (schema && CREATE_TABLES) createTable({ tableName, ...schema }).then((res) => (res.warningStatus === 0) ? console.log(tableName + " Table created.") : null);

    return Object.freeze({
        pool,
        query: {
            findAll,
            findOne,
            updateWhere,
            insert,
            search,
            deleteWhere
        },
        sanitizeSelectProps
    });

    async function findAll(searchData, props = null) {
        if (tableName == null) throw new Error("Db was not provided with a tableName.");
        return new Promise((resolve, reject) => {
            if (props == null || props.length === 0) props = "*";
            if (searchData == null || Object.keys(searchData).length === 0) {
                let sql = 'SELECT '+sanitizeSelectProps(props)+' FROM ' + pool.escapeId(tableName);
                pool.query(sql, (error, results, fields) => {
                    if (error) {
                        console.error("SQL ERROR: " + sql);
                        return reject(error);
                    }
                    return resolve(results);
                });
            } else {
                let sql = 'SELECT ' + sanitizeSelectProps(props) + ' FROM ' + pool.escapeId(tableName) + ' WHERE ' + sanitizeWhereObject(searchData);
                pool.query(sql, (error, results, fields) => {
                    if (error) {
                        console.error("SQL ERROR: " + sql, searchData);
                        return reject(error);
                    }
                    return resolve(results);
                });
            }
        });
    }

    async function findOne(searchData, props = null) {
        if (tableName == null) throw new Error("Db was not provided with a tableName.");
        if (searchData == null || Object.keys(searchData).length === 0) {
            throw new Error("Db cannot perform a findOne when an empty or null searchData is passed.");
        }
        return new Promise((resolve, reject) => {
            if (props == null || props.length === 0) props = "*";
            let sql = 'SELECT '+sanitizeSelectProps(props)+' FROM ' + pool.escapeId(tableName) + ' WHERE ' + sanitizeWhereObject(searchData) + ' LIMIT 1';
            pool.query(sql, (error, results, fields) => {
                if (error) {
                    console.error("SQL ERROR: " + sql, searchData);
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }

    async function updateWhere(updateData, whereData) {
        if (tableName == null) throw new Error("Db was not provided with a tableName.");
        if (whereData == null || Object.keys(whereData).length === 0) {
            throw new Error("Db cannot perform a updateWhere when an empty or null whereData is passed.");
        }
        if (updateData == null || Object.keys(updateData).length === 0) {
            throw new Error("Db cannot perform a updateWhere when an empty or null updateData is passed.");
        }
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) return reject(error);
                let sql = 'UPDATE ' + pool.escapeId(tableName) + ' SET ? WHERE ' + sanitizeWhereObject(whereData);
                connection.query(sql, updateData, (error, results, fields) => {
                    if (error) {
                        console.error("SQL ERROR: " + sql, updateData, whereData);
                        connection.release();
                        return reject(error);
                    }
                    connection.query('SELECT * FROM ' + pool.escapeId(tableName) + ' WHERE ' + sanitizeWhereObject(whereData), (error, results) => {
                        connection.release();
                        if (error) return reject(error);
                        return resolve(results);
                    });
                });
            });
        });
    }

    async function insert(insertData) {
        if (tableName == null) throw new Error("Db was not provided with a tableName.");
        if (insertData == null || Object.keys(insertData).length === 0) {
            throw new Error("Db cannot perform a insert when an empty or null insertData is passed.");
        }
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) return reject(error);
                let sql = 'INSERT INTO ' + pool.escapeId(tableName) + ' SET ?';
                connection.query(sql, [insertData], (error, results, fields) => {
                    if (error) {
                        console.error("SQL ERROR: " + sql, [insertData]);
                        connection.release();
                        return reject(error);
                    }
                    connection.query('SELECT * FROM ' + pool.escapeId(tableName) + ' WHERE ' + sanitizeWhereObject((results.insertId > 0) ? { id: results.insertId } : insertData), (error, results) => {
                        connection.release();
                        if (error) return reject(error);
                        return resolve(results[0]);
                    });
                });
            });
        });
    }

    async function deleteWhere(whereData) {
        if (tableName == null) throw new Error("Db was not provided with a tableName.");
        if (whereData == null || Object.keys(whereData).length === 0) {
            throw new Error("Db cannot perform a removeWhere when an empty or null whereData is passed.");
        }
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM ' + pool.escapeId(tableName) + ' WHERE ' + sanitizeWhereObject(whereData);
            pool.query(sql, (error, results, fields) => {
                if (error) {
                    console.error("SQL ERROR: " + sql, whereData);
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    async function search(searchProperty, searchString, returnProps, { searchLeft = true, searchRight = true }) {
        if (tableName == null) throw new Error("Db was not provided with a tableName.");
        if (searchProperty == null || searchProperty.length === 0) {
            throw new Error("Db cannot perform a search if the searchProperty is empty or null.");
        }
        if (searchString == null || searchString.length === 0) {
            throw new Error("Db cannot perform a search if the searchString is empty or null.");
        }
        return new Promise((resolve, reject) => {
            let sql = "SELECT "+sanitizeSelectProps(returnProps)+" FROM "+pool.escapeId(tableName)+" WHERE "+pool.escapeId(searchProperty)+" LIKE '"+((searchLeft)?'%':'')+pool.escape(searchString)+((searchRight)?'%':'')+"'";
            pool.query(sql, (error, results) => {
                if (error) {
                    console.error("SQL ERROR: " + sql);
                    return reject(error);
                }
                return  resolve(results);
            })
        })
    }

    function sanitizeSelectProps(props) {
        if (props === "*" || props == null || props.length === 0) return "*";
        if (!Array.isArray(props)) props = [props];
        return props.map(p => pool.escapeId(p)).join(",");
    }

    function sanitizeWhereObject(input) {
        return Object.keys(input).map(key => {
            let value = input[key];
            if (Array.isArray(value)) {
                if (value.length === 0) return `1<>1`;
                return `${pool.escapeId(key)} IN(${value.map(v=>pool.escape(v)).join(",")})`;
            }
            let operator = '=';
            if (typeof value === 'string' || value instanceof String) {
                if (value.startsWith('&eq;')) {
                    value = value.substring(4);
                    operator = '=';
                }
                if (value.startsWith('&neq;')) {
                    value = value.substring(5);
                    operator = '<>';
                }
                if (value.startsWith('&gt;')) {
                    value = value.substring(4);
                    operator = '>';
                }
                if (value.startsWith('&lt;')) {
                    value = value.substring(4);
                    operator = '<';
                }
                if (value.startsWith('&gte;')) {
                    value = value.substring(5);
                    operator = '>=';
                }
                if (value.startsWith('&lte;')) {
                    value = value.substring(5);
                    operator = '<=';
                }
                if (value.startsWith('&like;')) {
                    value = value.substring(6);
                    operator = 'LIKE';
                }
            }
            return pool.escapeId(key) + ` ${operator} ` + pool.escape(value);
        }).join(" AND ");
    }

    async function createTable(tableDefinition) {
        return new Promise((resolve, reject) => {
            pool.query(generateTableSql(tableDefinition), (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        })
    }

    function generateTableSql(tableDefinition) {
        const schema = {
            tableName: null,
            engine: "InnoDB",
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            ...tableDefinition
        };
        if (!schema.tableName) throw new Error("You must provide a tableName to generate the new table sql.");
        let sql = "CREATE TABLE IF NOT EXISTS " + pool.escapeId(schema.tableName) + "";

        const colSql = schema.columns.map(col => generateColumnSql(col)).join(", ");

        let indexSql = "";
        if (schema.indexes) indexSql = schema.indexes.map(index => generateIndexSql(index)).join(", ");

        // const indexSql = schema.columns.filter(col => col.index === true).map(col => "INDEX("+pool.escapeId(col.key)+")").join(", ");

        // sql += " (" + colSql + ((indexSql.length > 0) ? ", " + indexSql : "") + ")";
        sql += " (" + colSql + ((indexSql) ? ", " + indexSql : "") + ")";

        sql += " " + "ENGINE=" + schema.engine;
        sql += " " + "DEFAULT CHARSET=" + schema.charset;
        sql += " " + "DEFAULT COLLATE=" + schema.collate;

        console.log(sql);
        return sql;
    }

    function generateColumnSql(columnDefinition) {
        const col = {
            key: null,
            dataType: null,
            null: false,
            autoIncrement: false,
            primaryKey: false,
            uniqueKey: false,
            index: false,
            ...columnDefinition
        };

        if (!col.key) throw new Error("Db " + tableName + " Column must have a defined key.");
        if (!col.dataType) throw new Error("Db " + tableName + " Column must have a defined data type.");

        let sql = "";
        sql += pool.escapeId(col.key);
        sql += " " + col.dataType;

        if (col.null === false) sql += " " + "NOT NULL";
        else sql += " " + "NULL";

        if (col.autoIncrement === true) sql += " " + "AUTO_INCREMENT";
        if (col.primary === true) sql += " " + "PRIMARY KEY";
        // if (col.unique === true) sql += " " + "UNIQUE KEY";
        // if (col.index === true) sql += " " + "INDEX";
        // if (col.primaryKey === true) sql += " " + ", PRIMARY KEY(" + pool.escapeId(col.key) + ")";
        if (col.unique === true) sql += ", UNIQUE(" + pool.escapeId(col.key) + ")";
        if (col.index === true) sql += ", INDEX(" + pool.escapeId(col.key) + ")";

        return sql;
    }

    function generateIndexSql(indexDefinition) {
        const index = {
            id: null,
            type: null,
            ...indexDefinition
        };

        if (Array.isArray(index.id)) index.id = index.id.map(id => pool.escapeId(id)).join(",");
        else index.id = pool.escapeId(index.id);

        let sql = "";
        if (index.type === "primary") sql += "PRIMARY KEY(" + index.id + ")";
        if (index.type === "unique") sql += "UNIQUE KEY(" + index.id + ")";
        if (index.type === "index") sql += "INDEX(" + index.id + ")";
        return sql;
    }
}

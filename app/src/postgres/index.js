"use strict";
const promise = require("bluebird");
const users = require("./repos/users");
const tags = require("./repos/tags");
const notes = require("./repos/notes");
let options = {
    error: (err, e) => {
        console.log('error:');
        console.log(JSON.stringify(err));
        if (e.cn) {
            console.log('is e cn');
        }
        if (e.query) {
            console.log('query is: ');
            console.log(JSON.stringify(e.query));
            if (e.params) {
                console.log('params is: ');
                console.log(JSON.stringify(e.params));
            }
        }
        if (e.ctx) {
            console.log('ctx: ');
            console.log(JSON.stringify(e.ctx));
        }
    },
    promiseLib: promise,
    extend: (obj) => {
        obj.notes = new notes.Repository(obj, pgp);
        obj.tags = new tags.Repository(obj, pgp);
        obj.users = new users.Repository(obj, pgp);
    }
};
let connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/attic';
const pgPromise = require("pg-promise");
let pgp = pgPromise(options);
pgp.pg.defaults.poolSize = 20;
let db = pgp(connectionString);
const diag = require("./diagnostics");
diag.init(options);
module.exports = db;
//# sourceMappingURL=index.js.map
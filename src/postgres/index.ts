
import {IMain, IDatabase, IOptions} from 'pg-promise';
/*everyone says it's better than es6-promise*/
import * as promise from 'bluebird';

import * as users from './repos/users';
import * as tags from './repos/tags';
import * as notes from './repos/notes';

interface IExtensions{
  users: users.Repository,
  tags: tags.Repository,
  notes: notes.Repository
}

/*otions to pass to pg-promise initialization.*/
let options: IOptions<IExtensions>={

  error: (err, e) => {

    // e.dc = Database Context
    console.log('error:');
    console.log(JSON.stringify(err));
    if (e.cn) {
        // this is a connection-related error
        // cn = safe connection details passed into the library:
        //      if password is present, it is masked by #
        console.log('is e cn');
    }

    if (e.query) {
        // query string is available
        console.log('query is: ');
        console.log(JSON.stringify(e.query));
        if (e.params) {
            // query parameters are available
            console.log('params is: ');
            console.log(JSON.stringify(e.params));
        }
    }

    if (e.ctx) {
        // occurred inside a task or transaction
        console.log('ctx: ');
        console.log(JSON.stringify(e.ctx));
    }
  },

  promiseLib: promise,
  extend: (obj: IExtensions) =>{
    obj.notes = new notes.Repository(obj, pgp);
    obj.tags = new tags.Repository(obj, pgp);
    obj.users = new users.Repository(obj, pgp);
  }
}

// let configParam = {
//   host: 'localhost',
//   port: 5432,
//   database: 'attic',
//   user: 'postgres'
// };

let connectionString=process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/attic';

import * as pgPromise from 'pg-promise';
let pgp: IMain = pgPromise(options);
pgp.pg.defaults.poolSize = 20;


let db =<IDatabase<IExtensions>&IExtensions>pgp(connectionString);
// db.connect().then(result=>{
//   console.log('connected');
// })
// .catch(error=>{
//   console.log('error: ');
//   console.error(error.stack);
// })
import diag = require('./diagnostics');
diag.init(options);

export = db;

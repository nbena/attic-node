'use strict';

import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import index from './routes/index';
import * as ejs from 'ejs';

import * as postgres from './postgres';

/*my routes /api*/
import notes from './routes/api/notes';
import tags from './routes/api/tags';
import users from './routes/api/users';
import auth from './routes/api/auth';

import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

const app: express.Express = express();

/*init passport.*/
app.use(passport.initialize());

//view engine setup

app.set('views',path.join(__dirname,'views'));
app.engine('.html',ejs.renderFile);
app.set('view engine','html');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

import * as db from './postgres/index';


app.use('/', index);


app.use('/api/notes',notes);
app.use('/api/tags', tags);
app.use('/api/users', users);
app.use('/api/auth', auth);

/*
TODO: 404 for api error.
*/

//catch 404 and forward to error handler
app.use((req,res,next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//error handlers

//development error handler
//will print stacktrace
if(process.env.NODE_ENV === 'development') {
  app.use((err: Error,req,res,next) => {
    res.status(err['status'] || 500);
    res.render('error',{
      title: 'error',
      message: err.message,
      error: err
    });
  });
}

//production error handler
// no stacktrace leaked to user
app.use((err: Error,req,res,next) => {
  res.status(err['status'] || 500);
  console.log(err);
  console.error(err.stack);
  res.render('error',{
    title: 'error',
    message: err.message,
    error: {}
  });
});

export default app;

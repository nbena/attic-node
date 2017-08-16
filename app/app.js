'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const ejs = require("ejs");
const notes_1 = require("./routes/api/notes");
const tags_1 = require("./routes/api/tags");
const users_1 = require("./routes/api/users");
const auth_1 = require("./routes/api/auth");
const passport = require("passport");
const ajv = require("express-ajv");
const app = express();
app.use(passport.initialize());
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/api/notes', notes_1.default);
app.use('/api/tags', tags_1.default);
app.use('/api/users', users_1.default);
app.use('/api/auth', auth_1.default);
app.use(ajv.defaultErrorHandler);
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            title: 'error',
            message: err.message,
            error: err
        });
    });
}
app.use((err, req, res, next) => {
    res.status(err['status'] || 500);
    console.log(err);
    console.error(err.stack);
    res.render('error', {
        title: 'error',
        message: err.message,
        error: {}
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map
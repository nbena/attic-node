"use strict";
const os = require("os");
const fs = require("fs");
const pgMonitor = require("pg-monitor");
pgMonitor.setTheme('matrix');
var $DEV = process.env.NODE_ENV === 'development';
var logFile = './errors.log';
pgMonitor.setLog((msg, info) => {
    if (info.event === 'error') {
        var logText = os.EOL + msg;
        if (info.time) {
            logText = os.EOL + logText;
        }
        fs.appendFileSync(logFile, logText);
    }
    if (!$DEV) {
        info.display = false;
    }
});
var attached = false;
module.exports = {
    init: (options) => {
        if (attached) {
            return;
        }
        attached = true;
        if ($DEV) {
            pgMonitor.attach(options);
        }
        else {
            pgMonitor.attach(options, ['error']);
        }
    },
    done: () => {
        if (attached) {
            attached = false;
            pgMonitor.detach();
        }
    }
};
//# sourceMappingURL=diagnostics.js.map
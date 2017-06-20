'use strict';
const user_endpoint_1 = require("../../endpoints/api/user_endpoint");
const express = require("express");
const router = express.Router();
router.put('/create', user_endpoint_1.default.createUser);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=users.js.map
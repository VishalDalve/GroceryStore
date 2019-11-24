"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var index_1 = require("../env/index");
var message_1 = require("./../util/message");
/**
 * @description JWT token validation
 * @param req
 * @param res
 * @param next
 * @returns success and error any encountered
 */
exports.Auth = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send({ 'message': message_1.Messages.UNAUTHORIZED });
    }
    else {
        try {
            var decoded = jwt.verify(req.headers.authorization, index_1.default.envConfig.JWT_SECRET);
            req.loggedInUser = decoded;
            next();
        }
        catch (err) {
            res.status(401).send(err.message);
        }
    }
};
//# sourceMappingURL=authMiddleware.js.map
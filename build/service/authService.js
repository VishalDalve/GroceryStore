"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var index_1 = require("../env/index");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.newToken = function (id) {
        return jwt.sign({
            id: id
        }, index_1.default.envConfig.JWT_SECRET);
    };
    /**
    * @description Generate email token with five min expiry time
    * @returns { String }
    */
    AuthService.prototype.emailToken = function (id) {
        return jwt.sign({
            id: id
        }, index_1.default.envConfig.EMAIL_SECRET, {
            expiresIn: "5m"
        });
    };
    AuthService.prototype.passwordToken = function (id) {
        return jwt.sign({
            id: id
        }, index_1.default.envConfig.PASS_SECRET, {
            expiresIn: "5m"
        });
    };
    return AuthService;
}());
exports.default = new AuthService();
//# sourceMappingURL=authService.js.map
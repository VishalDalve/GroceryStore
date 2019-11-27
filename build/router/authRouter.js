"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
/**
 * @class AuthRouter
 */
var AuthRouter = /** @class */ (function () {
    function AuthRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    AuthRouter.prototype.routes = function () {
        this.router.post('/login', authController_1.default.login);
        this.router.post('/signup', authController_1.default.signUp);
        this.router.get('/verify/email/:token', authController_1.default.verifyEmail);
        this.router.post('/forgotPassword', authController_1.default.forgotPassword);
        this.router.post('/resetPassword/:token', authController_1.default.resetPassword);
    };
    return AuthRouter;
}());
exports.default = AuthRouter;
//# sourceMappingURL=authRouter.js.map
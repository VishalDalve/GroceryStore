"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = require("../controllers/userController");
var express_1 = require("express");
var authMiddleware_1 = require("../config/authMiddleware");
/**
 * @class UserRouter
 */
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.routes = function () {
        this.router.get('/', authMiddleware_1.Auth, userController_1.default.get);
        this.router.put('/', authMiddleware_1.Auth, userController_1.default.update);
        this.router.put('/update/password', authMiddleware_1.Auth, userController_1.default.changePassword);
        // Order management routes -------------
        this.router.post('/newOrder', authMiddleware_1.Auth, userController_1.default.newOrder);
        this.router.get('/getOrder/:id', authMiddleware_1.Auth, userController_1.default.getOrder);
    };
    return UserRouter;
}());
exports.default = UserRouter;
//# sourceMappingURL=userRouter.js.map
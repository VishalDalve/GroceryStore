"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var superAdminController_1 = require("../controllers/superAdminController");
var authMiddleware_1 = require("../config/authMiddleware");
var fileUpload_1 = require("../service/fileUpload");
/**
 * @class UserRouter
 */
var SuperAdminRouter = /** @class */ (function () {
    function SuperAdminRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    SuperAdminRouter.prototype.routes = function () {
        // User management --------
        this.router.get('/getAllUsers', authMiddleware_1.Auth, superAdminController_1.default.get);
        this.router.get('/getInactiveUsers', authMiddleware_1.Auth, superAdminController_1.default.getInactiveUsers);
        this.router.put('/deleteUser', authMiddleware_1.Auth, superAdminController_1.default.deleteUser);
        this.router.put('/updateUser', authMiddleware_1.Auth, superAdminController_1.default.updateUser);
        this.router.post('/createUser', authMiddleware_1.Auth, superAdminController_1.default.createUser);
        // Product management -----------
        this.router.post('/createProduct', [authMiddleware_1.Auth, fileUpload_1.upload.single('file')], superAdminController_1.default.createProduct);
        this.router.get('/getProduct', superAdminController_1.default.getProduct);
        this.router.put('/updateProduct', [authMiddleware_1.Auth, fileUpload_1.upload.single('file')], superAdminController_1.default.updatProduct);
        // Category management -----------
        this.router.post('/createCategory', authMiddleware_1.Auth, superAdminController_1.default.createCategory);
        this.router.get('/getCategory', superAdminController_1.default.getCategory);
        this.router.put('/updateCategory', authMiddleware_1.Auth, superAdminController_1.default.updatCategory);
    };
    return SuperAdminRouter;
}());
exports.default = SuperAdminRouter;
//# sourceMappingURL=superadminRouter.js.map
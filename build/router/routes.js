"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userRouter_1 = require("./userRouter");
var authRouter_1 = require("./authRouter");
var superadminRouter_1 = require("./superadminRouter");
var authMiddleware_1 = require("../config/authMiddleware");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger-doc/swagger-api-v1.json');
var fileUpload_1 = require("../service/fileUpload");
var path = require("path");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    /**
     * @param  {IServer} server
     * @returns void
     */
    Routes.init = function (server) {
        var router = express.Router();
        server.app.use('/', router);
        // auth
        server.app.use('/api/v1/auth', new authRouter_1.default().router);
        // users
        server.app.use('/api/v1/users', authMiddleware_1.Auth, new userRouter_1.default().router);
        //Super admin
        server.app.use('/api/v1/superadmin', new superadminRouter_1.default().router);
        //Swagger API
        //  server.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        //File upload
        server.app.use('/api/v1/upload', express.Router().post('/', fileUpload_1.upload.single('file'), function (req, res, next) {
            res.send({ 'fileName': req.file.filename || '' });
        }));
        //images
        server.app.use('/images', express.static('uploads'));
        server.app.use(express.static(path.join(__dirname, "../../Frontend/GroceryStore/", 'dist/GroceryStore')));
        server.app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../../Frontend/GroceryStore/", 'dist/GroceryStore/index.html'));
        });
    };
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=routes.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as speakEasy from 'speakeasy' ;
var Joi = require("joi");
var passwordHash = require("password-hash");
var userValidator_1 = require("../validator/userValidator");
var index_1 = require("../env/index");
var userModel_1 = require("../models/userModel");
var productModel_1 = require("../models/productModel");
var categoryModel_1 = require("../models/categoryModel");
var authService_1 = require("../service/authService");
var message_1 = require("../util/message");
var sendMail_1 = require("./../util/sendMail");
// import propertyModel from '../models/propertyModel';
// const client = require('twilio')(config.envConfig.twilioCred.accountSid, config.envConfig.twilioCred.authToken);
var SuperAdminController = /** @class */ (function () {
    function SuperAdminController() {
    }
    /**
     * @description Signup user takes name, email and password
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    SuperAdminController.prototype.createUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userVerify, validate, value, isUserExists, OrignalPassword, user, emailToken, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'superadmin' })];
                    case 1:
                        userVerify = _a.sent();
                        if (!userVerify) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        validate = Joi.validate(req.body, userValidator_1.default.CreateUserSchema);
                        if (validate.error) {
                            return [2 /*return*/, res.status(422).json({
                                    error: validate.error.details[0].message + ''
                                })];
                        }
                        value = validate.value;
                        return [4 /*yield*/, userModel_1.default.findOne({ 'email': value.email })];
                    case 2:
                        isUserExists = _a.sent();
                        if (isUserExists) {
                            return [2 /*return*/, res.status(422).send({ "message": message_1.Messages.ERROR_422 })];
                        }
                        OrignalPassword = value.password;
                        value.password = passwordHash.generate(value.password);
                        return [4 /*yield*/, userModel_1.default.create(value)];
                    case 3:
                        user = _a.sent();
                        emailToken = authService_1.default.emailToken(user._id);
                        sendMail_1.default.sendMail(value.email, "EMAIL VERIFICATION", { "email": value.email, "name": user.name, "password": OrignalPassword, "url": index_1.default.envConfig.EMAIL_VERIFICATION_URL + '/' + emailToken });
                        return [2 /*return*/, res.status(200).json({ "message": message_1.Messages.USER_CREATED, "data": emailToken })];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": e_1.message || message_1.Messages.ERROR_500 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * @description create new price Plan admin
    * @param  {express.Request} req
    * @param  {express.Response} res
    * @param  {express.NextFunction} next
    */
    SuperAdminController.prototype.createProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userVerify, plan, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'superadmin' })];
                    case 1:
                        userVerify = _a.sent();
                        if (!userVerify) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        console.log("Req.file", req.file.path);
                        console.log("Req.body", req.body);
                        //for product pic ---------    
                        if (req.file) {
                            req.body.productPic = req.file.path;
                        }
                        return [4 /*yield*/, productModel_1.default.create(req.body)];
                    case 2:
                        plan = _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": message_1.Messages.PLAN_CREATED })];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": e_2.message || message_1.Messages.ERROR_500 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
        * @description create new price Plan admin
        * @param  {express.Request} req
        * @param  {express.Response} res
        * @param  {express.NextFunction} next
        */
    SuperAdminController.prototype.createCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userVerify, plan, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'superadmin' })];
                    case 1:
                        userVerify = _a.sent();
                        if (!userVerify) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        // console.log("Req.file",req.file.path);
                        console.log("Req.body", req.body);
                        return [4 /*yield*/, categoryModel_1.default.create(req.body)];
                    case 2:
                        plan = _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": message_1.Messages.CATEGORY_CREATED })];
                    case 3:
                        e_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": e_3.message || message_1.Messages.ERROR_500 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * @param  {any} req User data
    * @param  {express.Response} res
    * @param  {express.NextFunction} next
    */
    SuperAdminController.prototype.get = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, total, queryObj, allusers, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'superadmin' })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        total = 0;
                        queryObj = { 'query': {} };
                        queryObj['query']['isDeleted'] = false;
                        //queryObj['query']['$and: [ { role: { $eq: "USER" } }, { role: { $eq: "subadmin" } } ] }'];
                        // if (req.query.subadmin) {
                        //     queryObj['query']['role'] = req.query.subadmin;
                        // }
                        // if (req.query.user) {
                        //     queryObj['query']['role'] = req.query.user;
                        // }
                        if (!req.query.user && !req.query.subadmin) {
                            queryObj['query']['role'] = { $not: { $eq: "superadmin" } };
                        }
                        // queryObj['query']['role'] = "superadmin";
                        // queryObj['query']['role'] = "subadmin";
                        if (req.query.email) {
                            queryObj['query']['email'] = req.query.email;
                        }
                        if (req.query.isActive) {
                            queryObj['query']['isActive'] = req.query.isActive;
                        }
                        if (!(Number(req.query.page) === 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, userModel_1.default.count(queryObj['query'])];
                    case 2:
                        total = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, userModel_1.default.find(queryObj['query']).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1))];
                    case 4:
                        allusers = _a.sent();
                        // let allusers = await UserModel.find({role:"USER", isDeleted:false},{ password: 0, createdAt:0, updatedAt:0,isDeleted:0 }).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1));
                        return [2 /*return*/, res.status(200).json({ total: total, "users": allusers })];
                    case 5:
                        e_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": message_1.Messages.ERROR_500 })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * @param  {any} req get all price plans
    * @param  {express.Response} res
    * @param  {express.NextFunction} next
    */
    SuperAdminController.prototype.getProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var total, queryObj, products, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log("Server ", req.body);
                        total = 0;
                        queryObj = { 'query': {} };
                        queryObj['query']['isActive'] = true;
                        queryObj['query']['isDeleted'] = false;
                        if (!(Number(req.query.page) === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, productModel_1.default.count(queryObj['query'])];
                    case 1:
                        total = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, productModel_1.default.find(queryObj['query']).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1))];
                    case 3:
                        products = _a.sent();
                        // let allusers = await UserModel.find({role:"USER", isDeleted:false},{ password: 0, createdAt:0, updatedAt:0,isDeleted:0 }).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1));
                        return [2 /*return*/, res.status(200).json({ total: total, "products": products })];
                    case 4:
                        e_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": message_1.Messages.ERROR_500 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * @param  {any} req get all price plans
    * @param  {express.Response} res
    * @param  {express.NextFunction} next
    */
    SuperAdminController.prototype.getCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var total, queryObj, categories, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log("Server ", req.body);
                        total = 0;
                        queryObj = { 'query': {} };
                        queryObj['query']['isActive'] = true;
                        queryObj['query']['isDeleted'] = false;
                        if (!(Number(req.query.page) === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, categoryModel_1.default.count(queryObj['query'])];
                    case 1:
                        total = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, categoryModel_1.default.find(queryObj['query']).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1))];
                    case 3:
                        categories = _a.sent();
                        return [2 /*return*/, res.status(200).json({ total: total, "categories": categories })];
                    case 4:
                        e_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": message_1.Messages.ERROR_500 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param  {any} req User data
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    SuperAdminController.prototype.getInactiveUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, total, queryObj, allusers, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'admin' })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        total = 0;
                        queryObj = { 'query': {} };
                        queryObj['query']['role'] = "USER";
                        queryObj['query']['isActive'] = false;
                        if (!(Number(req.query.page) === 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, userModel_1.default.count(queryObj['query'])];
                    case 2:
                        total = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, userModel_1.default.find(queryObj['query']).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1))];
                    case 4:
                        allusers = _a.sent();
                        return [2 /*return*/, res.status(200).json({ total: total, "users": allusers })];
                    case 5:
                        e_7 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": message_1.Messages.ERROR_500 })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // findOneAndRemove()
    /**
    * @param  {any} req Delete user
    * @param  {express.Response} res
    * @param  {express.NextFunction} next
    */
    SuperAdminController.prototype.deleteUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userupdate, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("Server ", req.body);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'superadmin' })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: req.body.userId }, { isDeleted: true })];
                    case 2:
                        userupdate = _a.sent();
                        if (!userupdate) {
                            res.status(404).send(message_1.Messages.ERROR_404);
                        }
                        return [2 /*return*/, res.status(200).json({ "message": "User Deleted Successfully" })];
                    case 3:
                        e_8 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": message_1.Messages.ERROR_500 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
  * @param  {any} req Update user
  * @param  {express.Response} res
  * @param  {express.NextFunction} next
  */
    SuperAdminController.prototype.updateUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, finduser, userupdate, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log("Server ", req.body);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'superadmin' })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.body.userId })];
                    case 2:
                        finduser = _a.sent();
                        if (!finduser)
                            res.status(404).send({ "message": message_1.Messages.ERROR_404 });
                        // finduser.firstname = req.body.firstname;
                        finduser.name = req.body.name;
                        finduser.isActive = req.body.isActive;
                        finduser.isDeleted = req.body.isDeleted;
                        finduser.role = req.body.role;
                        finduser.email = req.body.email;
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: req.body.userId }, finduser)];
                    case 3:
                        userupdate = _a.sent();
                        if (!userupdate) {
                            res.status(404).send(message_1.Messages.ERROR_404);
                        }
                        return [2 /*return*/, res.status(200).json({ "message": "User Updated Successfully" })];
                    case 4:
                        e_9 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": message_1.Messages.ERROR_500 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
* @param  {any} req Update user
* @param  {express.Response} res
* @param  {express.NextFunction} next
*/
    SuperAdminController.prototype.updatProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, findplan, userupdate, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log(req.file);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'superadmin' })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        return [4 /*yield*/, productModel_1.default.findOne({ _id: req.body.planid })];
                    case 2:
                        findplan = _a.sent();
                        if (!findplan)
                            res.status(404).send({ "message": message_1.Messages.ERROR_404 });
                        //for product pic ---------    
                        if (req.file) {
                            findplan.productPic = req.file.path;
                        }
                        // finduser.firstname = req.body.firstname;
                        if (req.body.productName)
                            findplan.productName = req.body.productName;
                        if (req.body.price)
                            findplan.price = req.body.price;
                        if (req.body.ourPrice)
                            findplan.ourPrice = req.body.ourPrice;
                        return [4 /*yield*/, productModel_1.default.findOneAndUpdate({ _id: req.body.planid }, findplan)];
                    case 3:
                        userupdate = _a.sent();
                        if (!userupdate) {
                            res.status(404).send(message_1.Messages.ERROR_404);
                        }
                        return [2 /*return*/, res.status(200).json({ "message": "Product Updated Successfully" })];
                    case 4:
                        e_10 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": message_1.Messages.ERROR_500 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
* @param  {any} req Update user
* @param  {express.Response} res
* @param  {express.NextFunction} next
*/
    SuperAdminController.prototype.updatCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, findCategory, userupdate, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: req.loggedInUser.id, role: 'superadmin' })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ "message": "Unauthorised | Not Found" })];
                        }
                        return [4 /*yield*/, categoryModel_1.default.findOne({ _id: req.body.categoryid })];
                    case 2:
                        findCategory = _a.sent();
                        if (!findCategory)
                            res.status(404).send({ "message": message_1.Messages.ERROR_404 });
                        // finduser.firstname = req.body.firstname;
                        findCategory.category = req.body.category;
                        findCategory.subCategory = req.body.subCategory;
                        findCategory.isActive = req.body.isActive;
                        findCategory.isDeleted = req.body.isDeleted;
                        return [4 /*yield*/, categoryModel_1.default.findOneAndUpdate({ _id: req.body.categoryid }, findCategory)];
                    case 3:
                        userupdate = _a.sent();
                        if (!userupdate) {
                            res.status(404).send(message_1.Messages.ERROR_404);
                        }
                        return [2 /*return*/, res.status(200).json({ "message": "Category Updated Successfully" })];
                    case 4:
                        e_11 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": message_1.Messages.ERROR_500 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return SuperAdminController;
}());
exports.default = new SuperAdminController();
//# sourceMappingURL=superAdminController.js.map
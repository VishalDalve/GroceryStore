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
var jwt = require("jsonwebtoken");
var Joi = require("joi");
var passwordHash = require("password-hash");
var index_1 = require("../env/index");
var userModel_1 = require("../models/userModel");
var authService_1 = require("../service/authService");
var userValidator_1 = require("../validator/userValidator");
var message_1 = require("./../util/message");
var sendMail_1 = require("./../util/sendMail");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    /**
     * @description login user through email and password.
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    AuthController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passStatus, token, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1.default.findOne({ 'email': req.body.email })];
                    case 1:
                        user = _a.sent();
                        //console.log("userLog2 :",user);
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ "message": message_1.Messages.ERROR_USER })];
                        }
                        if (!user.isVerified) {
                            return [2 /*return*/, res.status(400).send({ "message": "Please check your email id for verification link" })];
                        }
                        if (!user.isActive) {
                            return [2 /*return*/, res.status(400).send({ "message": "User Deactivated by Admin" })];
                        }
                        passStatus = passwordHash.verify(req.body.password, user.password);
                        if (passStatus == false || passStatus == "false")
                            res.status(401).send({ "message": "Please check your credentials" });
                        return [4 /*yield*/, authService_1.default.newToken(user._id)];
                    case 2:
                        token = _a.sent();
                        return [2 /*return*/, res.status(200).json({ "data": token, "user": { "_id": user._id, "name": user.name, "email": user.email } })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": e_1.message || message_1.Messages.ERROR_500 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Signup user takes name, email and password
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    AuthController.prototype.signUp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validate, value, isUserExists, user, emailToken, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        validate = Joi.validate(req.body, userValidator_1.default.CreateUserSchema);
                        if (validate.error) {
                            return [2 /*return*/, res.status(422).json({
                                    error: validate.error.details[0].message + ''
                                })];
                        }
                        value = validate.value;
                        return [4 /*yield*/, userModel_1.default.findOne({ 'email': value.email })];
                    case 1:
                        isUserExists = _a.sent();
                        if (isUserExists) {
                            return [2 /*return*/, res.status(422).send({ "message": message_1.Messages.ERROR_422 })];
                        }
                        value.password = passwordHash.generate(value.password);
                        return [4 /*yield*/, userModel_1.default.create(value)];
                    case 2:
                        user = _a.sent();
                        emailToken = authService_1.default.emailToken(user._id);
                        sendMail_1.default.sendMail(value.email, "EMAIL VERIFICATION", { "email": value.email, "name": user.name, "url": index_1.default.envConfig.EMAIL_VERIFICATION_URL + '/' + emailToken });
                        return [2 /*return*/, res.status(200).json({ "message": message_1.Messages.USER_CREATED, "data": emailToken })];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": e_2.message || message_1.Messages.ERROR_500 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Veification through email by user
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    AuthController.prototype.verifyEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded, user, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.params.token;
                        if (!token) {
                            //throw new Error("Invalid token")
                            res.status(401).send({ "message": message_1.Messages.ERROR_401 });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        decoded = jwt.verify(token, index_1.default.envConfig.EMAIL_SECRET);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: decoded.id, isVerified: false })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            res.status(404).send({ "message": message_1.Messages.ERROR_404 });
                        }
                        return [4 /*yield*/, userModel_1.default.updateOne({ _id: decoded.id }, { $set: { isVerified: true } })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": "Successfully verified" })];
                    case 4:
                        e_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": e_3.message || message_1.Messages.ERROR_500 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Forgot password takes email
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    AuthController.prototype.forgotPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1.default.findOne({ 'email': req.body.email, 'isVerified': true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(404).send({ "message": message_1.Messages.ERROR_USER });
                        }
                        token = authService_1.default.passwordToken(user._id);
                        return [4 /*yield*/, sendMail_1.default.sendMail(user.email, "Reset password", { "email": user.email, "url": index_1.default.envConfig.RESET_PASSWORD_URL + '?' + token })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": message_1.Messages.PASSWORD_RESET, "data": token })];
                    case 3:
                        e_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": e_4.message || message_1.Messages.ERROR_500 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * @description Reset password takes new password from user.
    * @param  {express.Request} req
    * @param  {express.Response} res
    * @param  {express.NextFunction} next
    */
    AuthController.prototype.resetPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, hash, decoded, user, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.params.token;
                        if (!token) {
                            //throw new Error("Invalid token")
                            res.status(401).send({ "message": message_1.Messages.ERROR_402 });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        hash = passwordHash.generate(req.body.password);
                        decoded = jwt.verify(token, index_1.default.envConfig.PASS_SECRET);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: decoded.id, isVerified: true })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            res.status(404).send({ "message": message_1.Messages.ERROR_USER });
                        }
                        return [4 /*yield*/, userModel_1.default.updateOne({ _id: decoded.id }, { $set: { password: hash } })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": message_1.Messages.PASSWORD_RESET })];
                    case 4:
                        e_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ "message": e_5.message || message_1.Messages.ERROR_500 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.default = new AuthController();
//# sourceMappingURL=authController.js.map
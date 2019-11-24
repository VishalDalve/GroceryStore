"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require('joi');
var Validator = /** @class */ (function () {
    function Validator() {
        this.CreateUserSchema = Joi.object().keys({
            // name is required
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required(),
            role: Joi.string(),
            contact: Joi.string(),
            address: Joi.string()
        });
    }
    return Validator;
}());
exports.default = new Validator();
//# sourceMappingURL=userValidator.js.map
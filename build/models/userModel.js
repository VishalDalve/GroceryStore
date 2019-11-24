"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var userInterface_1 = require("../interfaces/userInterface");
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: String,
    address: String,
    profilePic: {
        type: String,
    },
    role: String,
    contact: String,
    isActive: Boolean,
    isVerified: Boolean,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date
}, {
    collection: 'user',
    versionKey: false
}).pre('save', function (next) {
    if (this) {
        var now = new Date();
        if (!this.createdAt) {
            this.createdAt = now;
        }
        this.updatedAt = now;
        this.isActive = true;
        this.role = this.role || userInterface_1.Role.USER;
        this.isVerified = false;
        this.isDeleted = false;
    }
    next();
}).pre('updateOne', function (next) {
    if (this) {
        this.getUpdate().updatedAt = new Date();
    }
    next();
});
exports.default = connections.db.model('UserModel', UserSchema);
//# sourceMappingURL=userModel.js.map
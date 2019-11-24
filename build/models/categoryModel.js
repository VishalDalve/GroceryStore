"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var CategorySchema = new mongoose_1.Schema({
    category: String,
    isActive: Boolean,
    isDeleted: Boolean,
    subCategory: String,
    createdAt: Date,
    updatedAt: Date
}, {
    collection: 'category',
    versionKey: false
}).pre('save', function (next) {
    if (this) {
        var now = new Date();
        if (!this.createdAt) {
            this.createdAt = now;
        }
        this.updatedAt = now;
        this.isActive = true;
        this.isDeleted = false;
    }
    next();
}).pre('updateOne', function (next) {
    if (this) {
        this.getUpdate().updatedAt = new Date();
    }
    next();
});
exports.default = connections.db.model('CategoryModel', CategorySchema);
//# sourceMappingURL=categoryModel.js.map
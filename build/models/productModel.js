"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: true
    },
    productPic: {
        type: String,
    },
    price: Number,
    unit: String,
    ourPrice: Number,
    isActive: Boolean,
    isDeleted: Boolean,
    category: String,
    subCategory: String,
    createdAt: Date,
    updatedAt: Date
}, {
    collection: 'product',
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
exports.default = connections.db.model('ProductModel', ProductSchema);
//# sourceMappingURL=productModel.js.map
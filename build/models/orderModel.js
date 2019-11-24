"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var OrderSchema = new mongoose_1.Schema({
    orderBy: String,
    orderStatus: String,
    orderAmount: String,
    paymentStatus: String,
    products: [{
            productId: String,
            quantity: String,
        }],
    isActive: Boolean,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date
}, {
    collection: 'order',
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
exports.default = connections.db.model('OrderModel', OrderSchema);
//# sourceMappingURL=orderModel.js.map
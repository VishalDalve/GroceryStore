import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';

export interface IOrderModel extends Document {

    createdAt ? : Date;
    updatedAt ? : Date;
    category: string;
    isActive: boolean;
    subCategory: string;
    isDeleted: boolean;
    orderBy: string;
    orderStatus:string;
    orderAmount: string;
    paymentStatus: string;
    products: Array<string>;
}

const OrderSchema: Schema = new Schema({
    orderBy: String,
    orderStatus:String,
    orderAmount: String,
    paymentStatus: String,
    products: [{
        productId: String,
        quantity: String,
    }],
    isActive: Boolean,
    isDeleted:Boolean,
    createdAt : Date,
    updatedAt : Date

}, {
    collection: 'order',
    versionKey: false
}).pre('save', function<IOrderModel>(next) {
    if(this) {
        const now: Date = new Date();
        if (!this.createdAt) {
            this.createdAt = now;
        }
        this.updatedAt = now;
        this.isActive = true;
        this.isDeleted = false;
    }
    next();
  }).pre('updateOne', function<IOrderModel>(next) {
    if(this){
        this.getUpdate().updatedAt = new Date();
    }
    next();
  });

export default connections.db.model < IOrderModel >('OrderModel', OrderSchema);

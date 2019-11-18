import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';
// import { Role } from '../interfaces/userInterface';

export interface IProductModel extends Document {

    createdAt ? : Date;
    updatedAt ? : Date;
    productName: string;
    isActive: boolean;
    price:number;
    productPic:string;
    ourPrice:number; 
    category:string,
    subCategory:string,
    unit:string;
    isDeleted:boolean;
}

const ProductSchema: Schema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productPic: {
        type: String,   
    },
    price: Number,
    unit:String,
    ourPrice: Number,
    isActive: Boolean,
    isDeleted:Boolean,
    category:String,
    subCategory:String,
    createdAt : Date,
    updatedAt : Date

}, {
    collection: 'product',
    versionKey: false
}).pre('save', function<IProductModel>(next) {
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
  }).pre('updateOne', function<IProductModel>(next) {
    if(this){
        this.getUpdate().updatedAt = new Date();
    }
    next();
  });

export default connections.db.model < IProductModel >('ProductModel', ProductSchema);

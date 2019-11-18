import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';

export interface ICategoryModel extends Document {

    createdAt ? : Date;
    updatedAt ? : Date;
    category: string;
    isActive: boolean;
    subCategory:string;
    isDeleted:boolean;
}

const CategorySchema: Schema = new Schema({
    category: String,
    isActive: Boolean,
    isDeleted:Boolean,
    subCategory:String,
    createdAt : Date,
    updatedAt : Date

}, {
    collection: 'category',
    versionKey: false
}).pre('save', function<ICategoryModel>(next) {
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
  }).pre('updateOne', function<ICategoryModel>(next) {
    if(this){
        this.getUpdate().updatedAt = new Date();
    }
    next();
  });

export default connections.db.model < ICategoryModel >('CategoryModel', CategorySchema);

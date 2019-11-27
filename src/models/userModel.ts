import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';
import { Role } from '../interfaces/userInterface';

export interface IUserModel extends Document {

    createdAt ? : Date;
    updatedAt ? : Date;
    name: string;
    email: string;
    password: string;
    address:string;
    role: Role;
    contact: string;
    isActive: boolean;
    profilePic:string;
    isVerified:boolean;
    isDeleted:boolean,
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: String,
    address:String,
    profilePic: {
        type: String,   
    },
    role: String,
    contact: String,
    isActive: Boolean,
    isVerified:Boolean,
    isDeleted:Boolean,
    createdAt : Date,
    updatedAt : Date

}, {
    collection: 'user',
    versionKey: false
}).pre('save', function<IUserModel>(next) {
    if(this) {
        const now: Date = new Date();
        if (!this.createdAt) {
            this.createdAt = now;
        }
        this.updatedAt = now;
        this.isActive = true;
        this.role = this.role || Role.USER;
        this.isVerified = true;
        this.isDeleted = false;
    }
    next();
  }).pre('updateOne', function<IUserModel>(next) {
    if(this){
        this.getUpdate().updatedAt = new Date();
    }
    next();
  });

export default connections.db.model < IUserModel >('UserModel', UserSchema);

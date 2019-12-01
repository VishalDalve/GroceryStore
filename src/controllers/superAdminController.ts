import * as express from 'express';
// import * as speakEasy from 'speakeasy' ;
import * as Joi from 'joi';
import * as passwordHash from 'password-hash';


import Validator from '../validator/userValidator';
import { default as config } from '../env/index';
import UserModel, {IUserModel} from '../models/userModel';
import ProductModel, {IProductModel} from '../models/productModel';
import CategoryModel, {ICategoryModel} from '../models/categoryModel';
import AuthService from '../service/authService';
import { Messages } from '../util/message';

import  Mailer  from './../util/sendMail';
// import propertyModel from '../models/propertyModel';



// const client = require('twilio')(config.envConfig.twilioCred.accountSid, config.envConfig.twilioCred.authToken);


class SuperAdminController {


    /**
     * @description Signup user takes name, email and password
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async createUser(req: any, res: express.Response, next: express.NextFunction): Promise<any> {
        try {


            let userVerify = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            if (!userVerify) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            }

            

             let validate = Joi.validate(req.body, Validator.CreateUserSchema);
             if (validate.error){
                 return res.status(422).json({
                     error: validate.error.details[0].message + ''
                 });
             }
             let value = validate.value;
             
             let isUserExists = await UserModel.findOne({'email': value.email}); //, 'isVerified': true
             if (isUserExists){
                 return res.status(422).send({"message":Messages.ERROR_422})
             }

             let OrignalPassword = value.password;
 
             value.password = passwordHash.generate(value.password);
             let user:any = await UserModel.create(value);       
 
             let emailToken = AuthService.emailToken(user._id);
 
             Mailer.sendMail(value.email, "EMAIL VERIFICATION", {"email":value.email,"name": user.name, "password":OrignalPassword,"url": config.envConfig.EMAIL_VERIFICATION_URL + '/' + emailToken})
             return res.status(200).json({"message": Messages.USER_CREATED, "data": emailToken})
 
        } catch (e) {
            return res.status(500).json({"message":e.message || Messages.ERROR_500})
        }
     }


     /**
     * @description create new price Plan admin
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async createProduct(req: any, res: express.Response, next: express.NextFunction): Promise<any> {
        try {

            let userVerify = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            if (!userVerify) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            } 

            console.log("Req.file",req.file.path);
            console.log("Req.body",req.body);
            

             //for product pic ---------    
            if (req.file) { req.body.productPic = req.file.path; }

            let plan:any = await ProductModel.create(req.body); 

             return res.status(200).json({"message": Messages.PLAN_CREATED})
 
        } catch (e) {
            return res.status(500).json({"message":e.message || Messages.ERROR_500})
        }
     }
 /**
     * @description create new price Plan admin
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async createCategory(req: any, res: express.Response, next: express.NextFunction): Promise<any> {
        try {

            let userVerify = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            if (!userVerify) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            } 

            // console.log("Req.file",req.file.path);
            console.log("Req.body",req.body);
            

             //for product pic ---------    
            //if (req.file) { req.body.productPic = req.file.path; }

            let plan:any = await CategoryModel.create(req.body); 

             return res.status(200).json({"message": Messages.CATEGORY_CREATED})
 
        } catch (e) {
            return res.status(500).json({"message":e.message || Messages.ERROR_500})
        }
     }

     


     /**
     * @param  {any} req User data
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async get(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
            //console.log("Server ",req.body);

            let user = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            if (!user) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            }

            let total: Number = 0;
            let queryObj = { 'query': {} };

            queryObj['query']['isDeleted'] = false;
            //queryObj['query']['$and: [ { role: { $eq: "USER" } }, { role: { $eq: "subadmin" } } ] }'];

            // if (req.query.subadmin) {
            //     queryObj['query']['role'] = req.query.subadmin;
            // }

            // if (req.query.user) {
            //     queryObj['query']['role'] = req.query.user;
            // }
            if (!req.query.user && !req.query.subadmin) {

            queryObj['query']['role'] = { $not: { $eq: "superadmin" }};}
            // queryObj['query']['role'] = "superadmin";
            // queryObj['query']['role'] = "subadmin";
            


            if (req.query.email) {
                queryObj['query']['email'] = req.query.email;
            }
            if (req.query.isActive) {
                queryObj['query']['isActive'] = req.query.isActive;
            }
            // if (req.query.contact) {
            //     queryObj['query']['contact'] = req.query.contact;
            // }


            if (Number(req.query.page) === 1) {
                total = await UserModel.count(queryObj['query']);
                //total = await UserModel.count({role:"USER", isDeleted:false});
            }

            let allusers  = await UserModel.find(queryObj['query']).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1));

            // let allusers = await UserModel.find({role:"USER", isDeleted:false},{ password: 0, createdAt:0, updatedAt:0,isDeleted:0 }).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1));

            return res.status(200).json({total,"users": allusers})

        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }


     /**
     * @param  {any} req get all price plans
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async getProduct(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
            console.log("Server ",req.body);

            // let user = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            // if (!user) {
            //     return res.status(404).send({"message":"Unauthorised | Not Found"})
            // }

           let total: Number = 0;
            let queryObj = { 'query': {} };

            queryObj['query']['isActive'] = true;
            queryObj['query']['isDeleted'] = false;


            
            // if (req.query.contact) {
            //     queryObj['query']['contact'] = req.query.contact;
            // }


            if (Number(req.query.page) === 1) {
                total = await ProductModel.count(queryObj['query']);
                //total = await UserModel.count({role:"USER", isDeleted:false});
            }


            //let allplans  = await PricingModel.find(queryObj['query']);

            let products  = await ProductModel.find(queryObj['query']).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1));

            // let allusers = await UserModel.find({role:"USER", isDeleted:false},{ password: 0, createdAt:0, updatedAt:0,isDeleted:0 }).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1));

            return res.status(200).json({total,"products": products})
          
        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }
     /**
     * @param  {any} req get all price plans
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async getCategory(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
            console.log("Server ",req.body);

            // let user = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            // if (!user) {
            //     return res.status(404).send({"message":"Unauthorised | Not Found"})
            // }

           let total: Number = 0;
            let queryObj = { 'query': {} };

            queryObj['query']['isActive'] = true;
            queryObj['query']['isDeleted'] = false;


            
            // if (req.query.contact) {
            //     queryObj['query']['contact'] = req.query.contact;
            // }


            if (Number(req.query.page) === 1) {
                total = await CategoryModel.count(queryObj['query']);
                //total = await UserModel.count({role:"USER", isDeleted:false});
            }


            //let allplans  = await PricingModel.find(queryObj['query']);

            let categories  = await CategoryModel.find(queryObj['query']).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1));


            return res.status(200).json({total,"categories": categories})
          
        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }

    /**
     * @param  {any} req User data
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async getInactiveUsers(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
            //console.log("Server ",req.body);

            let user = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'admin' });
             
            if (!user) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            }

            let total: Number = 0;
            let queryObj = { 'query': {} };

            queryObj['query']['role'] = "USER";
            queryObj['query']['isActive'] = false;


            if (Number(req.query.page) === 1) {
                total = await UserModel.count(queryObj['query']);
                //total = await UserModel.count({role:"USER", isDeleted:false});
            }

            let allusers  = await UserModel.find(queryObj['query']).limit(Number(req.query.perPage)).skip(Number(req.query.perPage) * (Number(req.query.page) - 1));


            return res.status(200).json({total,"users": allusers})

        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }
 

    // findOneAndRemove()

     /**
     * @param  {any} req Delete user
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async deleteUser(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
            console.log("Server ",req.body);

            let user = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            if (!user) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            }

            let userupdate = await UserModel.findOneAndUpdate({_id: req.body.userId}, {isDeleted:true});
            if(!userupdate) {
                res.status(404).send(Messages.ERROR_404)
            }
            return res.status(200).json({"message":"User Deleted Successfully"})

            
        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }
 
       /**
     * @param  {any} req Update user 
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async updateUser(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
            console.log("Server ",req.body);

            //checking Admin ---------
            let user = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            if (!user) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            }

            //finding User Exist or not ------------
            let finduser = await UserModel.findOne({ _id: req.body.userId });
            if (!finduser)
                res.status(404).send({ "message": Messages.ERROR_404 })

                // finduser.firstname = req.body.firstname;
                finduser.name = req.body.name;
                finduser.isActive =   req.body.isActive;
                finduser.isDeleted =   req.body.isDeleted; 
                finduser.role =   req.body.role;
                finduser.email = req.body.email;


            //Updating user here -------------------
            let userupdate = await UserModel.findOneAndUpdate({_id: req.body.userId},finduser);
            if(!userupdate) {
                res.status(404).send(Messages.ERROR_404)
            }
            return res.status(200).json({"message":"User Updated Successfully"})

            
        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }


         /**
     * @param  {any} req Update user 
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async updatProduct(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
           
            console.log(req.file);
            
            //checking Admin ---------
            let user = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            if (!user) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            }

            //finding User Exist or not ------------
            let findplan = await ProductModel.findOne({ _id: req.body.planid });
            if (!findplan)
                res.status(404).send({ "message": Messages.ERROR_404 })

                 //for product pic ---------    
                if (req.file) { findplan.productPic = req.file.path; }

                // finduser.firstname = req.body.firstname;
                if (req.body.productName)
                findplan.productName = req.body.productName;
                if (req.body.price)
                findplan.price = req.body.price;
                if (req.body.ourPrice)
                findplan.ourPrice = req.body.ourPrice;
                

            //Updating user here -------------------
            let userupdate = await ProductModel.findOneAndUpdate({_id: req.body.planid}, findplan);
            if(!userupdate) {
                res.status(404).send(Messages.ERROR_404)
            }
            return res.status(200).json({"message":"Product Updated Successfully"});

            
        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500});
        }
      
    }

         /**
     * @param  {any} req Update user 
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async updatCategory(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
           
            //checking Admin ---------
            let user = await UserModel.findOne({ _id: req.loggedInUser.id, role: 'superadmin' });
             
            if (!user) {
                return res.status(404).send({"message":"Unauthorised | Not Found"})
            }

            //finding User Exist or not ------------
            let findCategory = await CategoryModel.findOne({ _id: req.body.categoryid });
            if (!findCategory)
                res.status(404).send({ "message": Messages.ERROR_404 })

                // finduser.firstname = req.body.firstname;
                findCategory.category = req.body.category;
                findCategory.subCategory = req.body.subCategory;
                findCategory.isActive = req.body.isActive;
                findCategory.isDeleted = req.body.isDeleted;
                

            //Updating user here -------------------
            let userupdate = await CategoryModel.findOneAndUpdate({_id: req.body.categoryid}, findCategory);
            if(!userupdate) {
                res.status(404).send(Messages.ERROR_404)
            }
            return res.status(200).json({"message":"Category Updated Successfully"})

            
        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }

}

export default new SuperAdminController();
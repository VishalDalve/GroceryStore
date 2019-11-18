import UserModel from '../models/userModel';
import OrderModel from '../models/orderModel';
import ProductModel from '../models/productModel';
import * as express from 'express';
import { Messages } from './../util/message';
import * as passwordHash from 'password-hash';

class UserController {

    /**
     * @param  {any} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async get(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
            let user = await UserModel.findOne({_id: req.loggedInUser.id});
            return res.status(200).json({"_id": user._id, "name": user.name, "email": user.email})
        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }

   
    /**
     * @param  {any} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public update(req: any, res: express.Response, next: express.NextFunction): void {

       
    }


  /**
     * @description Change password takes new password from user. 
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async changePassword(req: any, res: express.Response, next: express.NextFunction): Promise<any> {

        try {
            let user = await UserModel.findOne({ _id: req.loggedInUser.id });
            if (!user)
                res.status(404).send({ "message": Messages.ERROR_404 })

            let hash = passwordHash.generate(req.body.password);

            user.password = hash
            await UserModel.updateOne({ _id: req.loggedInUser.id }, user)
            return res.status(200).json({ "message": Messages.PASSWORD_RESET })

        } catch (e) {
            return res.status(500).json({ "message": e.message || Messages.ERROR_500 })
        }

    }

     

    /**
     * @description newOrder creation. 
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async newOrder(req: any, res: express.Response, next: express.NextFunction): Promise<any> {

        try {
            let user = await UserModel.findOne({ _id: req.loggedInUser.id });
            if (!user)
                res.status(404).send({ "message": Messages.ERROR_404 });
               
                // console.log("PrpByiD", req.params.id);

                let order:any = await OrderModel.create(req.body); 

            return res.status(200).json({ "message": Messages.ORDER_CREATED });

        } catch (e) {
            return res.status(500).json({ "message": e.message || Messages.ERROR_500 });
        }

    }

    public async getOrder(req: any, res: express.Response, next: express.NextFunction): Promise<any> {

        try {
            let OrderArray = new Array(); 

            let user = await UserModel.findOne({ _id: req.loggedInUser.id });
            if (!user)
                res.status(404).send({ "message": Messages.ERROR_404 });

            
               
               // console.log("PrpByiD", req.params.id);

                let order:any = await OrderModel.findOne({ _id: req.params.id });

                // console.log("order", order);


                var test = new Promise((resolve, reject) => {

                    order.products.forEach(async( element, index, array )=> {

                        let product = await ProductModel.findOne({ _id: element.productId });
    
                        let temp = {
    
                            "product":product,
                            "quantity":element.quantity
    
                        }
                       OrderArray.push(temp);
                       if (index === array.length -1) resolve();
                       
                    });

                });
                
                test.then(() => {
                    //console.log('All done!');
                    return res.status(200).json({ "user":user, "order": OrderArray });
                });


                

                // console.log("product22", OrderArray);

            

        } catch (e) {
            return res.status(500).json({ "message": e.message || Messages.ERROR_500 });
        }

    }

}

export default new UserController();
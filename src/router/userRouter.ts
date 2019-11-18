import UserController from '../controllers/userController';
import { Router } from 'express';
import { Auth } from '../config/authMiddleware';
/**
 * @class UserRouter
 */
export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', Auth, UserController.get);
        this.router.put('/', Auth, UserController.update);
        this.router.put('/update/password', Auth, UserController.changePassword);

        // Order management routes -------------
        this.router.post('/newOrder', Auth, UserController.newOrder);
        this.router.get('/getOrder/:id', Auth, UserController.getOrder);

    }
}

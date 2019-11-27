import { Router } from 'express';
import AuthController from '../controllers/authController';
/**
 * @class AuthRouter
 */
export default class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.post('/login', AuthController.login);
        this.router.post('/signup', AuthController.signUp);
        this.router.get('/verify/email/:token', AuthController.verifyEmail);
        this.router.post('/forgotPassword', AuthController.forgotPassword);
        this.router.post('/resetPassword/:token', AuthController.resetPassword);
    }
}

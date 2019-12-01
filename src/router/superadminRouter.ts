import { Router } from 'express';

import SuperAdminController from '../controllers/superAdminController';
import { Auth } from '../config/authMiddleware';
import { upload } from '../service/fileUpload';

/**
 * @class UserRouter
 */
export default class SuperAdminRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        // User management --------
        this.router.get('/getAllUsers', Auth, SuperAdminController.get);
        this.router.get('/getInactiveUsers', Auth, SuperAdminController.getInactiveUsers);
        this.router.put('/deleteUser', Auth, SuperAdminController.deleteUser);
        this.router.put('/updateUser', Auth, SuperAdminController.updateUser);
        this.router.post('/createUser', Auth, SuperAdminController.createUser);

        // Product management -----------
        this.router.post('/createProduct', [Auth, upload.single('file')], SuperAdminController.createProduct);
        this.router.get('/getProduct', SuperAdminController.getProduct);
        this.router.put('/updateProduct', [Auth, upload.single('file')], SuperAdminController.updatProduct);

        // Category management -----------
        this.router.post('/createCategory', Auth, SuperAdminController.createCategory);
        this.router.get('/getCategory', SuperAdminController.getCategory);
        this.router.put('/updateCategory', Auth, SuperAdminController.updatCategory);

    }
}

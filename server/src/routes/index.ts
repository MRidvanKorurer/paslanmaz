import express, { Router } from 'express';
import productRoute from './productRoutes';
import categoryRoute from "./categoryRoutes";
import videoRoute from "./videoRoutes";
import adminRoute from "./adminRoutes";
import staticContetentRoute from "./staticContentRoute";

const router: Router = express.Router();

router.use('/products', productRoute);
router.use('/categories',categoryRoute);
router.use("/video",videoRoute);
router.use("/admin",adminRoute);
router.use("/static",staticContetentRoute);

export default router;
import { Router } from "express";
import { AllController } from "./all/controller";
import { AllRoutes } from "./all/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/all', AllRoutes.routes);

        return router;
    }

}
import { Router } from "express";
import { AllController } from "./controller";


export class AllRoutes {

    static get routes(): Router {

        const router = Router();
        const allController = new AllController();

        router.get('/', allController.getall);

        return router;
    }

}
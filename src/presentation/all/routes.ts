import { Router } from "express";
import { AllController } from "./controller";


export class AllRoutes {

    static get routes(): Router {

        const router = Router();
        const allController = new AllController();

        router.get('/', allController.getall);

        router.get('/:id', allController.getAllById);

        router.post('/', allController.createAll);

        return router;
    }

}
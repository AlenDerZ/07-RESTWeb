import { Router } from "express";
import { AllController } from "./controller";


export class AllRoutes {

    static get routes(): Router {

        const router = Router();
        const allController = new AllController();

        router.get('/', allController.getAll);

        router.get('/:id', allController.getAllById);

        router.post('/', allController.createAll);

        router.put('/:id', allController.updateAll);

        router.delete('/:id', allController.deleteAll);

        return router;
    }

}
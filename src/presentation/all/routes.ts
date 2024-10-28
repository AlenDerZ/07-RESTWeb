import { Router } from "express";
import { AllController } from "./controller";
import { AllDatasourceImpl } from "../../infrastructure/datasources/all.datasource.impl";
import { AllRepositoryImpl } from "../../infrastructure/repositories/all.repository.impl";


export class AllRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new AllDatasourceImpl();
        const repository = new AllRepositoryImpl(datasource);
        
        const allController = new AllController(repository);

        router.get('/', allController.getAll);

        router.get('/:id', allController.getAllById);

        router.post('/', allController.createAll);

        router.put('/:id', allController.updateAll);

        router.delete('/:id', allController.deleteAll);

        return router;
    }

}
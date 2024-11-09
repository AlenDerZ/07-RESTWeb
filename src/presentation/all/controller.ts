import { Request, Response } from "express";
import { CreateAllDto, UpdateAllDto } from "../../domain/dtos";
import { AllRepository, GetAlls, GetAll, CreateAll, UpdateAll, DeleteAll, CustomError } from "../../domain";

export class AllController {

    //* Dependencies Injection
    constructor(
        private readonly repository: AllRepository
    ) {}

    private handleError = (res: Response, error: unknown) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({error: error.message});
            return;
        }

        res.status(500).json({error: 'Internal server error - check logs'});
    }

    public getAll = (req:Request, res:Response) => {
        new GetAlls(this.repository)
            .execute()
            .then(all => res.json(all))
            .catch(error => this.handleError(res, error));
    }

    public getAllById = (req:Request, res:Response) => {
        const id = +req.params.id;

        new GetAll(this.repository)
            .execute(id)
            .then(all => res.json(all))
            .catch(error => this.handleError(res, error));
    }

    public createAll = (req:Request, res:Response) => {
        const [error, createAllDto] = CreateAllDto.create(req.body);
        if(error) return res.status(400).json({ error});
        
        new CreateAll(this.repository)
            .execute(createAllDto!)
            .then(all => res.status(201).json(all))
            .catch(error => this.handleError(res, error));
    }

    public updateAll = (req:Request, res:Response) => {
        const id = +req.params.id;
        const [error, updateAllDto] = UpdateAllDto.create({...req.body, id});
        if(error) return res.status(400).json({error});

        new UpdateAll(this.repository)
            .execute(updateAllDto!)
            .then(all => res.json(all))
            .catch(error => this.handleError(res, error));
    }

    public deleteAll = (req:Request, res:Response) => {
        const id = +req.params.id;

        new DeleteAll(this.repository)
            .execute(id)
            .then(all => res.json(all))
            .catch(error => this.handleError(res, error));
    }
}
import { prisma } from "../../data/postgres"; 
import { Request, Response } from "express";
import { CreateAllDto, UpdateAllDto } from "../../domain/dtos";
import { AllRepository, GetAlls, GetAll, CreateAll, UpdateAll, DeleteAll } from "../../domain";

export class AllController {

    //* Dependencies Injection
    constructor(
        private readonly repository: AllRepository
    ) {}

    public getAll = (req:Request, res:Response) => {
        new GetAlls(this.repository)
            .execute()
            .then(all => res.json(all))
            .catch(error => res.status(400).json({error}));
    }

    public getAllById = (req:Request, res:Response) => {
        const id = +req.params.id;

        new GetAll(this.repository)
            .execute(id)
            .then(all => res.json(all))
            .catch(error => res.status(400).json({error}));
    }

    public createAll = (req:Request, res:Response) => {
        const [error, createAllDto] = CreateAllDto.create(req.body);
        if(error) return res.status(400).json({ error});
        
        new CreateAll(this.repository)
            .execute(createAllDto!)
            .then(all => res.json(all))
            .catch(error => res.status(400).json({error}));
    }

    public updateAll = (req:Request, res:Response) => {
        const id = +req.params.id;
        const [error, updateAllDto] = UpdateAllDto.create({...req.body, id});
        if(error) return res.status(400).json({error});

        new UpdateAll(this.repository)
            .execute(updateAllDto!)
            .then(all => res.json(all))
            .catch(error => res.status(400).json({error}));
    }

    public deleteAll = (req:Request, res:Response) => {
        const id = +req.params.id;

        new DeleteAll(this.repository)
            .execute(id)
            .then(all => res.json(all))
            .catch(error => res.status(400).json({error}));
    }
}
import { prisma } from "../../data/postgres"; 
import { Request, Response } from "express";

export class AllController {

    //* Dependencies Injection
    constructor() {}

    public getAll = async (req:Request, res:Response) => {
        const all = await prisma.all.findMany();
        res.json(all)
    }

    public getAllById = async (req:Request, res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Id must be a number'});
        // const result = all.find(item => item.id === id);
        const result = await prisma.all.findFirst({where: {id}});

        (result)
            ? res.json(result)
            : res.status(404).json({error: `All with id ${id} not found`});
    }

    public createAll = async (req:Request, res:Response) => {
        const {name} = req.body;
        if(!name) return res.status(400).json({error: 'Name is required'});

        const all = await prisma.all.create({
            data: { name }
        });
        
        res.json(all);
    }

    public updateAll = async (req:Request, res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Id must be a number'});

        const result = await prisma.all.findFirst({where: {id}});
        if(!result) return res.status(404).json({error: `All with id ${id} not found`});

        const {name, completedAt} = req.body;

        const all = await prisma.all.update({
            where: {id},
            data: { 
                name, 
                completedAt: (completedAt) ? new Date(completedAt) : null
            }
        });

        res.json(all);
    }

    public deleteAll = async (req:Request, res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Id must be a number'});

        const result = await prisma.all.findFirst({where: {id}});
        if(!result) return res.status(404).json({error: `All with id ${id} not found`});

        const deleted = await prisma.all.delete({where: {id}});

        (deleted)
            ? res.json({deleted})
            : res.status(400).json({error: `All with id ${id} not found`});

    }
}
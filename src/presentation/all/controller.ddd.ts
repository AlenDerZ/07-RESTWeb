import { prisma } from "../../data/postgres"; 
import { Request, Response } from "express";
import { CreateAllDto, UpdateAllDto } from "../../domain/dtos";
import { AllRepository } from "../../domain";

export class AllController {

    //* Dependencies Injection
    constructor(
        private readonly allRepository: AllRepository
    ) {}

    public getAll = async (req:Request, res:Response) => {
        const all = await this.allRepository.getAll();
        res.json(all);
    }

    public getAllById = async (req:Request, res:Response) => {
        const id = +req.params.id;

        try{
            const all = await this.allRepository.findById(id);
            res.json(all);
        }catch(error){
            res.status(400).json({error});
        }
    }

    public createAll = async (req:Request, res:Response) => {

        const [error, createAllDto] = CreateAllDto.create(req.body);
        if(error) return res.status(400).json({ error});
        
        const all = await this.allRepository.create(createAllDto!);
        res.json(all);
    }

    public updateAll = async (req:Request, res:Response) => {
        const id = +req.params.id;
        const [error, updateAllDto] = UpdateAllDto.create({...req.body, id});
        if(error) return res.status(400).json({error});

        const updatedAll = await this.allRepository.updateById(updateAllDto!);
        res.json(updatedAll);
    }

    public deleteAll = async (req:Request, res:Response) => {
        const id = +req.params.id;
        const deleteAll = await this.allRepository.deleteById(id);
        res.json(deleteAll);
    }
}
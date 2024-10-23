import { Request, Response } from "express";

const all = [
    {id: 1, name: 'Kuro', completedAt: new Date()},
    {id: 2, name: 'Xiao', completedAt: null},
    {id: 3, name: 'Luffy', completedAt: new Date()},
    {id: 4, name: 'Hua Cheng', completedAt: new Date()},
    {id: 5, name: 'Xie Lian', completedAt: new Date()},
    {id: 6, name: 'Nami', completedAt: new Date()},
]

export class AllController {

    //* Dependencies Injection
    constructor() {}

    public getAll = (req:Request, res:Response) => {
        return res.json(all)
    }

    public getAllById = (req:Request, res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Id must be a number'});
        const result = all.find(item => item.id === id);

        (result)
            ? res.json(result)
            : res.status(404).json({error: `All with id ${id} not found`});
    }

    public createAll = (req:Request, res:Response) => {
        const {name} = req.body;
        if(!name) return res.status(400).json({error: 'Name is required'});

        const newAll = {
            id: all.length + 1,
            name: name,
            completedAt: null
        }

        all.push(newAll)
        res.json(newAll);
    }

    public updateAll = (req:Request, res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Id must be a number'});

        const result = all.find(item => item.id === id);
        if(!result) return res.status(404).json({error: `All with id ${id} not found`});

        const {name, completedAt} = req.body;

        result.name = name || result.name;
        (completedAt === null) 
            ? result.completedAt = null
            : result.completedAt = new Date(completedAt || result.completedAt);

        res.json(result);

    }
}
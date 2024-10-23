import { Request, Response } from "express";

const all = [
    {id: 1, name: 'Kuro', createdAt: new Date()},
    {id: 2, name: 'Xiao', createdAt: null},
    {id: 3, name: 'Luffy', createdAt: new Date()},
    {id: 4, name: 'Hua Cheng', createdAt: new Date()},
    {id: 5, name: 'Xie Lian', createdAt: new Date()},
]

export class AllController {

    //* Dependencies Injection
    constructor() {}

    public getall = (req:Request, res:Response) => {
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
            createdAt: null
        }

        all.push(newAll)
        res.json(newAll);
    }
}
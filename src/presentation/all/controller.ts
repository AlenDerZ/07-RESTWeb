import { Request, Response } from "express";

export class AllController {

    //* Dependencies Injection
    constructor() {

    }

    public getall = (req:Request, res:Response) => {
        res.json([
            {id: 1, name: 'Kuro', createdAt: new Date()},
            {id: 2, name: 'Xiao', createdAt: null},
            {id: 3, name: 'Luffy', createdAt: new Date()},
        ])
    }
}
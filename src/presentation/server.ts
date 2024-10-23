import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {

    private app = express(); 
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: Options) {
        const {port, public_path = 'public'} = options;
        this.port = port;
        this.public_path = public_path;
    }

    async start(){

        //* Middlewares

        //* Public Folder
        this.app.use(express.static(this.public_path));

        //* Routes
        this.app.get('/api/all', (req, res) => {
            res.json([
                {id: 1, name: 'Kuro', createdAt: new Date()},
                {id: 2, name: 'Xiao', createdAt: null},
                {id: 3, name: 'Luffy', createdAt: new Date()},
            ])
        })

        //* SPA
        this.app.get(`*`, (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
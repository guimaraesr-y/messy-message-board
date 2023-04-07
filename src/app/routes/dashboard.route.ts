import { Router, Request, Response } from "express";

const dashboardRoute = Router();

// TODO:
// implement routes

dashboardRoute.get('/', (req:Request, res:Response) => {
    res.sendFile('dashboard.html', { root: __dirname+'/../view/' });
})

dashboardRoute.get('/:msgId', (req:Request, res:Response) => {
    
})

export default dashboardRoute;
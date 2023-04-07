import { Router, Request, Response } from "express";

import MessageService from "../service/messageService";
import { TokenRequest } from "../../interfaces/IToken";

const messageRoute = Router();
const messageService = new MessageService();

messageRoute.get('/all', (req:TokenRequest, res:Response) => {
    messageService.getAll(req, res);
})

messageRoute.post('/send', (req:TokenRequest, res:Response) => {
    messageService.sendMessage(req, res);
})

messageRoute.get('/delete/:id', (req:TokenRequest, res:Response) => {
    messageService.deleteMessage(req, res);
})

messageRoute.get('/:id', (req:TokenRequest, res:Response) => {
    messageService.getOneMessage(req, res);
})

export default messageRoute;
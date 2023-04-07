import { Router, Request, Response } from "express";

import ReactionService from "../service/reactionService";
import { TokenRequest } from "../../interfaces/IToken";

const messageRoute = Router();
const reactionService = new ReactionService();

messageRoute.get('/react/:msgId/up', (req:TokenRequest, res:Response) => {
    reactionService.reactUp(req, res);
})

messageRoute.get('/react/:msgId/down', (req:TokenRequest, res:Response) => {
    reactionService.reactDown(req, res);
})

export default messageRoute;
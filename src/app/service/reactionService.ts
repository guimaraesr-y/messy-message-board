import { Response } from "express";
import Reaction from "../model/Reaction";
import { TokenRequest } from "../../interfaces/IToken";

class ReactionService {

    checkReaction(userId:number, msgId:number, liked:boolean) {
        Reaction.findOne({
            where: {
                userId: userId,
                msgId: msgId,
                liked: liked
            }
        }).then(data => {

        }).catch(err => {

        })
    }

    reactUp(req:TokenRequest, res:Response) {
        const { msgId } = req.params;
        Reaction.create({
            userId: req.auth?.id,
            messageId: parseInt(msgId),
            liked: true
        }).then(data => {
            res.status(200).end();
        }).catch(err => {
            res.status(401).json({'ok':false,'error':err.message});
        })
    }

    reactDown(req:TokenRequest, res:Response) {
        const { msgId } = req.params;
        Reaction.create({
            userId: req.auth?.id,
            messageId: parseInt(msgId),
            liked: false
        }).then(data => {
            res.status(200).end();
        }).catch(err => {
            res.status(401).json({'ok':false,'error':err.message});
        })
    }

}

export default ReactionService
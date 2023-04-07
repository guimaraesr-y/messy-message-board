import { Request, Response} from "express";
import { TokenRequest } from "../../interfaces/IToken";

import Message from "../model/Message";
import User from "../model/User";
import Reaction from "../model/Reaction";

class MessageService {
    
    getAll(req:Request, res:Response) {
        Message.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'user']
                }, {
                    model: Message,
                    include: [{
                        model: User,
                        attributes: ['id', 'name', 'user']
                    }]
                },
                {
                    model: Reaction,
                    attributes: ['userId', 'liked', 'createdAt']
                }
            ]
        })
        .then(data => data.map(message => message.dataValues))
        .then(data => res.status(200).json(data))
        .catch(err => {
            res.json({'ok':false,'error':err}) // implementar custom error
        })
    }

    sendMessage(req:TokenRequest, res:Response) {
        Message.create({
            userId: req.auth?.id,
            message: req.body.message,
            refsMessage: req.body.refsMessage
        })
        .then(data => res.redirect('/dashboard'))
        .catch(err => {
            res.status(500).end(err.message) // implementar custom error
        }); 
    }

    deleteMessage(req:TokenRequest, res:Response) {
        Message.destroy({
            where: {
                id: req.params.id,
                userId: req.auth?.id
            }
        })
        .then(data => res.status(200).json({'ok':true}))
        .catch(err => {
            res.status(500).end(err.message) // implementar custom error
        })
    }

    getOneMessage(req:TokenRequest, res:Response) {
        Message.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'user']
                }, {
                    model: Message,
                    include: [{
                        model: User,
                        attributes: ['id', 'name', 'user']
                    }]
                },
                {
                    model: Reaction,
                    attributes: ['userId', 'liked', 'createdAt']
                }
            ]
        })
        .then(data => data?.dataValues)
        .then(data => res.status(200).json({'ok':true,...data}))
        .catch(err => {
            res.status(500).end(err.message) // implementar custom error
        })
    }

}

const msg = new MessageService();

export default MessageService
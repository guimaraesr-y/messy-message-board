import { Request, Response} from "express";

import User from "../model/User";
import UserError from "../error/UserError";
import { generateToken } from "../../jwt";
import { compareHash, hashData } from "../../crypt";
import { ILogin, IRegister } from "../../interfaces/IAuth";
import { TokenRequest } from "../../interfaces/IToken";

class UserService {
    
    login(req: Request, res: Response) {
        const loginData: ILogin = req.body;
        User.findOne({ // finds user by username
            where: {
                user: loginData.user
            }
        }).then(data => {
            if(data == null) throw new UserError('User not found!');
            if(compareHash(loginData.password, data?.dataValues.password)) {
                const token = generateToken({ // generates auth token with data
                    id:data?.dataValues.id,
                    user: data?.dataValues.user,
                    name: data?.dataValues.name
                })
                
                // creates the expiry date for the cookie
                let date = new Date();
                date.setDate(date.getDate()+30);

                res.status(200)
                    .cookie('session', token, { expires: date })
                    .redirect('/dashboard');
            }
        }).catch(err => {
            if(err instanceof UserError) res.status(404).json({'ok':false,'error': err.message})
            else res.status(500).json({'ok':false,'error':'Internal Server Error'})
        })
    }

    register(req: Request, res: Response) {
        const registerData: IRegister = req.body;
        User.create({
            user: registerData.user,
            password: hashData(registerData.password),
            name: registerData.name
        }).then(data => {

            res.redirect('/login');
        }).catch(err => {
            res.end(err.toString());
        })
    }

    // retrieves own user data
    getMyData(req:TokenRequest, res:Response) {
        if(!req.auth) {
            res.end();
            return
        }
        User.findOne({
            where: {
                'id': req.auth.id
            }
        }).then(data => data?.dataValues)
        .then(data => res.status(200).json({'id':data.id,'name':data.name,'user':data.user}))
        .catch(err => res.status(500).json({'ok':false,'error':err}))
    }

}

export default UserService
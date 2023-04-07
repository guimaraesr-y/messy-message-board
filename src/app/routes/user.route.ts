import { Router, Request, Response } from "express";
import UserService from "../service/userService";
import { TokenRequest } from "../../interfaces/IToken";
import User from "../model/User";

const userRoute = Router();
const userService = new UserService();

userRoute.get('/', (req:Request, res:Response) => {
    // todo
    res.end();
})

userRoute.post('/login', (req:Request, res:Response) => {
    userService.login(req, res);
})

userRoute.post('/register', (req:Request, res:Response) => {
    userService.register(req, res);
})

userRoute.get('/logout', (req:Request, res:Response) => {
    // TODO
})

userRoute.get('/data/me', (req:TokenRequest, res:Response) => {
    userService.getMyData(req, res);
})

export default userRoute;
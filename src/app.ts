import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import { Express, Request, Response, NextFunction } from 'express';
import { TokenData, TokenRequest } from './interfaces/IToken';
import { validateToken } from './jwt';

import userRoute from './app/routes/user.route';
import dashboardRoute from './app/routes/dashboard.route';
import messageRoute from './app/routes/message.route';

class App {
	server: Express;
	
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		// this.server.use(cors());
		this.server.use(function(req:Request, res:Response, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		  });
		this.server.use(cookieParser());
		this.server.use(express.static(__dirname+'/public'));
		this.server.use(express.urlencoded({ extended: true }));
		this.server.use(express.json());
		
	}

	routes() {
		// validates user token
		this.server.use((req: TokenRequest, res: Response, next: NextFunction) => { // token verifier
			if(['/', '/user/login', '/user/register', '/login', '/register'].indexOf(req.path)!=-1) {
				next();
				return;
			}

			// variables
			let token = req.cookies.session;
			let decoded: TokenData;
			if(!token) {
				res.redirect('/login');
				return;
			}
			
			// validating tokens 
			try {
				decoded = validateToken(token);
				req.auth = decoded;
				next(); // goes on
			} catch(err) {
				console.error(err);
				res.end("Um erro inesperado ocorreu! <a href='/dashboard'>Voltar</a>");
			}
		})

		// root routes
		this.server.get('/', (req:Request, res:Response) => {
			res.sendFile('presentation.html', { root: __dirname+'/app/view/' });
		})
		this.server.get('/login', (req:Request, res:Response) => {
			res.sendFile('login.html', { root: __dirname+'/app/view/' });
		})
		this.server.get('/register', (req:Request, res:Response) => {
			res.sendFile('register.html', { root: __dirname+'/app/view/' });
		})

		// specific routes
		this.server.use('/user', userRoute);
		this.server.use('/dashboard', dashboardRoute);
		this.server.use('/message', messageRoute);
	}
}

export default App;
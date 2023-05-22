import express from "express";
import { readFileSync } from "fs";
import path from "path";
import { Kons } from "./Kons";
import { Util, util } from "../Util";
import { session } from "../SessionData";

class AuthRouter {
	constructor() {
	}

	init(router: express.Router): void {
		console.log('mnk router implementation');

		//hal login
		router.get(Kons.login, (_req: express.Request, _res: express.Response) => {
			try {
				let filestr: string = readFileSync(path.join(util.baseDir, "/template/mnk/login.html"), { encoding: "utf-8" });
				filestr = filestr.replace('{action}', '/mnk/login');
				filestr = filestr.replace('{revisi}', Util.revisi);
				_res.status(200).send(filestr);
			}
			catch (e) {
				util.respError(_res, e);
			}
		});

		//post login
		router.post(Kons.login, (_req: express.Request, _res: express.Response) => {
			try {
				//TODO: check
				session(_req).statusLogin = true;
				_res.status(200).send("ok");
			}
			catch (e) {
				util.respError(_res, e);
			}
		});


	}

}

export const authRouter: AuthRouter = new AuthRouter();
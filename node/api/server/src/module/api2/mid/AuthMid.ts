import express from "express";
import { config } from "../../../config/Config";
import { session } from "../../SessionData";
// import { sm } from "../../silsilah/SilsilahModule";

export class AuthMid {
	checkAuthSession(req: express.Request, resp: express.Response, next: express.NextFunction) {
		console.log('check status login:');
		console.log(session(req).statusLogin);

		if (session(req).statusLogin) {
			if (config.loginCheck) {
				// console.log(sm.session(req));
				resp.status(401).send('');
			}
			else {
				next();
			}
		}
		else {
			next();
		}
	}
}
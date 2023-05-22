import express from "express";
import { readFileSync } from "fs";
import path from "path";
import { auth } from "../auth/Auth";
import { Util, util } from "../Util";
import { Kons } from "./Kons";
import { authRouter } from "./authRouter";
import { karyawanRouter } from "./karyawanRouter";

export class Router {
	readonly router = express.Router();

	impl(): void {
		console.log('mnk router implementation');
		authRouter.init(this.router);
		karyawanRouter.init(this.router);

		//beranda
		this.router.get(Kons.beranda, auth.cont.checkAuthSession, (_req: express.Request, _res: express.Response) => {
			try {
				//TODO: check entitlement
				let filestr: string = readFileSync(path.join(util.baseDir, "/template/mnk/beranda.html"), { encoding: "utf-8" });
				filestr = filestr.replace('{revisi}', Util.revisi);
				_res.status(200).send(filestr);
			}
			catch (e) {
				util.respError(_res, e);
			}

		});



	}
}
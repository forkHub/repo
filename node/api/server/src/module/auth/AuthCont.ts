import md5 from "blueimp-md5";
import express from "express";
import { session } from "../SessionData";
import { Util, util } from "../Util";
import { auth } from "./Auth";

export class AuthCont {

	async renderLogin(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			resp.status(200).send(auth.halLogin.render());
		}
		catch (e) {
			util.respError(resp, e);
		}

	}

	async renderLupa(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let file: string = await util.getFileNoCache("template/lupa_password.html");

			file = file.replace('${Util.revisi}', Util.revisi);
			file = file.replace('${util.randId}', util.randId);

			resp.status(200).send(file); //TODO:
		}
		catch (e) {
			util.respError(resp, e);
		}

	}

	async renderGanti(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			resp.status(200).send(""); //TODO:
		}
		catch (e) {
			util.respError(resp, e);
		}

	}

	async login(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let userName: string = _req.body.user_name;
			let password: string = md5(_req.body.password);

			let hasil: ISlAdmin[] = await auth.dao.login(userName, password);

			if (!hasil || hasil.length == 0) {
				console.log('username: ' + userName + '/pass: ' + password);
				throw Error('user name atau password salah');
			}

			let admin: ISlAdmin = hasil[0];

			session(_req).defId = admin.def_id;
			session(_req).id = admin.id;
			session(_req).statusLogin = true;

			console.log('validate login status: ' + session(_req).statusLogin);

			resp.status(200).send(admin.def_id + '');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async lupa(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			resp.status(200).send("");
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async ganti(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			resp.status(200).send("");
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async logout(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			_req.session = null;
			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	checkAuthGet(req: express.Request, resp: express.Response, next: express.NextFunction) {
		if (!session(req).statusLogin) {
			resp.status(401).redirect(auth.routerKons.login);
		}
		else {
			next();
		}
	}

	checkAuthSession(req: express.Request, resp: express.Response, next: express.NextFunction) {
		if (!session(req).statusLogin) {
			resp.status(401).send('belum login');
			next();
		}
		else {
			next();
		}
	}

}

export var authController: AuthCont = new AuthCont();


/**
 * auth controller masih menggunakan database yang sama
 * 
 */


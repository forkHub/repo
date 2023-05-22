import express from "express";
import { auth } from "./Auth";

export class Router {
	readonly router = express.Router();

	impl(): void {
		this.router.get(auth.routerKons.login, auth.cont.renderLogin);
		this.router.post(auth.routerKons.login, auth.cont.login);

		this.router.get(auth.routerKons.logout, auth.cont.logout);

		this.router.get(auth.routerKons.lupa, auth.cont.renderLupa);
		this.router.post(auth.routerKons.lupa, auth.cont.lupa);	//kirim email dari form lupa password

		this.router.get(auth.routerKons.ganti, auth.cont.renderGanti);
		this.router.post(auth.routerKons.ganti, auth.cont.ganti);

	}
}
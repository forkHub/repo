import express from "express";
import { auth } from "../auth/Auth";
import { RouterKOns } from "./RouterKons";
import { sm } from "./Silsilah";

export class Router {

	readonly router = express.Router();

	impl(): void {
		this.router.get("/", auth.cont.checkAuthGet, sm.berandaCont.renderBeranda);

		//#web
		this.router.get(RouterKOns.berandaId, auth.cont.checkAuthGet, sm.berandaCont.renderBerandaId);
		this.router.get(RouterKOns.lihatProfile, auth.cont.checkAuthGet, sm.berandaCont.lihatProfileAnggota);
	}
}
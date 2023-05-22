import express from "express";
import { AnggotaRouter } from "./Anggota";

export class Router {
	readonly router: express.Router = express.Router();
	readonly anggota: AnggotaRouter = new AnggotaRouter();

	impl() {
		console.log('map router api2');
		this.anggota.router(this.router);
	}

}
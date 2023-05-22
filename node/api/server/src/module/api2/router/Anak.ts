import express from "express";
import { mid } from "../mid/Mid";
import { RouterAPI2Kons } from "../RouterAPI2Kons";

export class AnakCont {
	mapRouter(router: express.Router): void {

		router.post(RouterAPI2Kons.api_anggota_daftar, mid.authMid.checkAuthSession, (_req: express.Request, _resp: express.Response): void => {
			//TODO:
		});
	}
}
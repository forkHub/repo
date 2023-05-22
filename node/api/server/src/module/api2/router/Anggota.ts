import express from "express";
import { util } from "../../Util";
import { cont } from "../cont/Cont";
import { mid } from "../mid/Mid";
import { RouterAPI2Kons } from "../RouterAPI2Kons";

export class AnggotaRouter {

	router(router: express.Router) {

		router.post(RouterAPI2Kons.api_profile_lihat, mid.authMid.checkAuthSession, (_req: express.Request, resp: express.Response) => {
			try {
				console.log('profile lihat');
				let id: number = parseInt(_req.body.id);
				cont.anggota.lihatProfileAnggota(id).then((anggota: ISlAnggota) => {
					resp.status(200).send(JSON.stringify(anggota));
				}).catch((e) => {
					util.respError(resp, e);
				});
			} catch (e) {
				util.respError(resp, e);
			}
		})

		router.post(RouterAPI2Kons.api_anggota_lihat, mid.authMid.checkAuthSession, (_req: express.Request, resp: express.Response) => {
			try {
				console.log('lihat anggota:');
				let id: number = parseInt(_req.body.id);
				console.log('id: ' + id);

				cont.anggota.lihatAnggota(id).then((anggota: ISlAnggota) => {
					resp.status(200).send(JSON.stringify(anggota));
				}).catch((e) => {
					util.respError(resp, e);
				});
			} catch (e) {
				util.respError(resp, e);
			}
		})

	}
}

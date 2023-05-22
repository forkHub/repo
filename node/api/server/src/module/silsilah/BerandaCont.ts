import express from "express";
import { util } from "../Util";
import { session } from "../SessionData";
import { sm } from "./Silsilah";

export class BerandaCont {

	async renderBerandaId(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt((_req).params.id);
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
			let anggota: ISlAnggota = anggotaAr[0]
			let hal: string;

			anggota.ortu = [];
			await sm.ent.kerabat.ortu(anggota, anggota.ortu);
			await sm.ent.anggota.muatPasangan(anggota);
			if (anggota.pas) {
				anggota.pas.ortu = [];
				await sm.ent.kerabat.ortu(anggota.pas, anggota.pas.ortu);
			}

			hal = sm.halSilsilah.render(anggota);

			resp.setHeader("Access-Control-Allow-Origin", "*");
			resp.status(200).send(hal);


		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	//TODO: [ref] digabung dengan di atas biar lebih ringkas, parameter id
	async renderBeranda(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = session(_req).defId;
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
			let anggota: ISlAnggota = anggotaAr[0]
			let hal: string;

			// console.debug('def id ' + id);

			// console.log("data anggota:");
			// console.log("=============");
			// console.log(anggota);
			// console.log("=============");

			anggota.ortu = [];
			await sm.ent.kerabat.ortu(anggota, anggota.ortu);
			await sm.ent.anggota.muatPasangan(anggota);
			if (anggota.pas) {
				anggota.pas.ortu = [];
				await sm.ent.kerabat.ortu(anggota.pas, anggota.pas.ortu);
			}

			hal = sm.halSilsilah.render(anggota);

			resp.setHeader("Access-Control-Allow-Origin", "*");
			resp.status(200).send(hal);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async lihatProfileAnggota(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);
			let hal: string;
			let anggota: ISlAnggota = await sm.ent.anggota.populate(id);

			await sm.ent.kerabat.muat(anggota);
			await sm.ent.anggota.muatPasangan(anggota);

			hal = sm.halProfile.render(anggota);

			resp.status(200).send(hal);
		} catch (e) {
			util.respError(resp, e);
		}
	}

}
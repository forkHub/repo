
import express from "express";
import { util } from "../../Util";
import { toko } from "../../AppToko";
import { session } from "../../SessionData";
import { IBarangObj, IAnggotaObj } from "../../Type";

export class HalLapakController {

	async renderId(_req: express.Request, resp: express.Response): Promise<void> {

		try {
			let anggotaId: number = parseInt(_req.params.lapak_id);
			let userNameLogin: string = session(_req).userName;
			let hasil: string = '';
			let barang: IBarangObj[];
			let lapak: string;
			let lapakDesk: string;
			let lapakObj: IAnggotaObj[];
			let wa: string;

			//TODO: [dev] url lapak, gak pakai session

			barang = await toko.dao.web.lapak.daftarBarang(anggotaId);
			lapakObj = await toko.dao.anggota.lapak(anggotaId);
			lapak = lapakObj[0].lapak;
			lapakDesk = lapakObj[0].deskripsi;
			wa = (await toko.dao.anggota.wa(anggotaId))[0].wa;

			hasil = toko.render.halLapak.render(barang, userNameLogin, lapak, wa, lapakDesk);

			resp.status(200).send(hasil);
		}
		catch (e) {
			util.respError(resp, e);
		}

	}

	async daftar(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let userName: string = session(_req).userName;
			let hasil: string = '';
			let daftar: IAnggotaObj[];

			daftar = await toko.dao.anggota.daftarLapak();
			hasil = toko.render.halDaftarLapak.render(daftar, userName);
			resp.status(200).send(hasil);
		}
		catch (e) {
			util.respError(resp, e);
		}

		// return hasil;
	}
}
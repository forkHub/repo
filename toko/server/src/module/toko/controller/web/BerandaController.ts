import express from "express";
import { util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { session } from "../../SessionData";

import { IBarangObj } from "../../Type";

export class BerandaController {

	async renderBerandaHal(_req: express.Request, resp: express.Response): Promise<void> {
		try {

			let halLog: number = parseInt(_req.params.hal);
			let userName: string = session(_req).userName;

			let hal: string = await toko.cont.web.beranda.renderBeranda2(halLog, "---", userName);
			resp.status(200).send(hal);
		}
		catch (err) {
			util.respError(resp, err);
		}
	}

	async renderBerandaCari(_req: express.Request, resp: express.Response): Promise<void> {
		try {

			let halLog: number = parseInt(_req.params.hal);
			let userName: string = session(_req).userName;
			let cari: string = decodeURI(_req.params.kata_kunci);
			let jmlBarang: number = (await toko.dao.web.beranda.jmlCariBarang(cari))[0].jumlah;
			let halAbs: number = halLog * config.jmlPerHal;
			let dataBarang: IBarangObj[] = await toko.dao.web.beranda.cariBarang(cari, halAbs);

			let hal: string = toko.render.halDepan.render(dataBarang, halLog, jmlBarang, cari, userName);
			resp.status(200).send(hal);

		}
		catch (err) {
			util.respError(resp, err);
		}
	}

	async renderBeranda(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let userName: string = session(_req).userName;

			let hal: string = await toko.cont.web.beranda.renderBeranda2(0, "---", userName);
			resp.status(200).send(hal);

		}
		catch (err) {
			util.respError(resp, err);
		}
	}

	private async renderBeranda2(halLog: number, kataKunci: string, userName: string): Promise<string> {
		let limit: number = (config.jmlPerHal);
		let offset: number = halLog * limit;

		let data: IBarangObj[] = await toko.dao.web.beranda.semuaBarang(offset);
		let jmlBarang: number = (await toko.dao.web.beranda.jmlBarang())[0].jumlah;

		return (toko.render.halDepan.render(data, halLog, jmlBarang, kataKunci, userName));

	}

	/**
	 * cari barang
	 */
	async cariBarang(kataKunci: string, halLog: number, userName: string): Promise<string> {

		let dataBarang: IBarangObj[];
		let jmlBarang: number = 0;
		let halAbs: number = halLog * config.jmlPerHal;
		let kataKunciUri: string = decodeURI(kataKunci);

		jmlBarang = (await toko.dao.web.beranda.jmlCariBarang(kataKunciUri))[0].jumlah;
		dataBarang = await toko.dao.web.beranda.cariBarang(kataKunciUri, halAbs);

		return toko.render.halDepan.render(dataBarang, halLog, jmlBarang, kataKunciUri, userName);
	}
}

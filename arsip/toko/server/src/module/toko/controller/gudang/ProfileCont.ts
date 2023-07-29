import express from "express";
import { util } from "../../Util";
import { v } from "../../Validator";
import { toko } from "../../AppToko";
import { session } from "../../SessionData";
import { IAnggotaObj } from "../../Type";

export class ProfileCont {

	async renderHalProfile(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = session(req).id;
			let penjual: IAnggotaObj = (await toko.dao.anggota.info(id))[0];
			let hasil: string = toko.render.gudang.profile.render(penjual);
			// (penjual);
			resp.status(200).send(hasil);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async renderHalEditProfile(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = session(req).id;
			let penjual: IAnggotaObj = (await toko.dao.anggota.profile(id))[0];
			let hasil: string = toko.render.gudang.editProfile.render(penjual);
			// (penjual);
			resp.status(200).send(hasil);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	//post
	async editAktif(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = session(req).id;
			let aktif: number = parseInt(req.body.aktif);

			let data: IAnggotaObj = {
				aktif: aktif
			}

			session(req).aktif = aktif;

			await toko.dao.anggota.edit(id, data);
			resp.status(200).send('');

		} catch (e) {
			util.respError(resp, e);
		}
	}

	async editProfile(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = session(req).id;

			let data: IAnggotaObj = {
				user_name: v.escape(req.body.user_name),
				alamat: v.escape(req.body.alamat),
				deskripsi: v.escape(req.body.deskripsi),
				email: v.escape(req.body.email),
				lapak: v.escape(req.body.lapak),
				wa: v.escape(req.body.wa)
			}

			session(req).lapak = data.lapak;
			// session(req).wa = data.wa;
			session(req).userName = data.user_name;

			await toko.dao.gudang.profile.editProfile(data, id);
			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}
}
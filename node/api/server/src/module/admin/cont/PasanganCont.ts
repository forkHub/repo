import express from "express";
import { util } from "../../Util";
import { admin } from "../admin";
import { RouterKons } from "../RouterKons";

export class PasanganCont {

	async renderCariPasangan(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);

			let kunci: string = '-';
			let jmlAbs: number = 0;
			let hal: number = 0;
			let jkl: string = '';
			let offset: number = 0;

			//parameter bila ada
			if (_req.params.kunci) kunci = _req.params.kunci;
			if (_req.params.hal) hal = parseInt(_req.params.hal);

			//buat relasi bila belum ada
			let anggota: ISlAnggota = (await admin.dao.anggota.lihat(id))[0];
			if (anggota.rel_id == 0) {
				anggota.rel_id = (await admin.dao.rel.baru()).insertId;
				await admin.dao.anggota.updateRel(anggota.id, anggota.rel_id);
			}

			//daftar anggota filter berdasarkan jkl
			if (anggota.jkl == 'l') {
				jkl = 'p';
			}
			else {
				jkl = 'l';
			}

			let anggotaAr: ISlAnggota[] = await admin.dao.pasangan.daftarCalonPasangan(kunci, offset, jkl);
			jmlAbs = (await admin.dao.pasangan.jmlCariPasangan(kunci, offset, jkl));

			let str: string = admin.render.pilihAnggotaGenerik.render(
				anggotaAr,
				anggota,
				RouterKons.editRelasi,
				RouterKons.halCariPasanganFilter,
				'pilih pasangan:',
				kunci,
				jmlAbs,
				hal);

			resp.status(200).send(str);
		} catch (e) {
			util.respError(resp, e);
		}
	}

	async lihatPasangan(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);
			let anggotaAr: ISlAnggota[] = await admin.dao.anggota.lihat(id);;
			let anggota: ISlAnggota = anggotaAr[0];
			let pasangan: ISlAnggota[] = [];

			if (anggota.rel_id == 0) {
				pasangan = [];
			}
			else {
				pasangan = (await admin.dao.pasangan.lihatPasangan(id, anggota.rel_id));
			}
			resp.status(200).send(JSON.stringify(pasangan));
		}
		catch (e) {
			util.respError(resp, e);
		}
	}
}
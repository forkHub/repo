import fs from "fs";
import { IBarangObj, IHasilQuery, IFoto } from "../../Type";
import { fileDisk } from "../../FileDisk";
import { v } from "../../Validator";
import { util } from "../../Util";
import { toko } from "../../AppToko";
import express from "express";
import { session } from "../../SessionData";
import { config } from "../../Config";

export class BarangCont {

	async renderDaftarBarang(req: express.Request, resp: express.Response): Promise<void> {
		// console.log('render daftar barang mulai');

		try {
			let anggotaId: number = (session(req).id);
			let aktif: number;
			let barang: IBarangObj[] = await toko.dao.gudang.barang.daftarBarang(anggotaId);
			let namaLapak: string = session(req).lapak;

			aktif = session(req).aktif;

			let hal: string = toko.render.gudang.beranda.render(barang, namaLapak, anggotaId, aktif);

			resp.status(200).send(hal);
		}
		catch (e) {
			util.respError(resp, e);
		}

		// console.log('render daftar barang selesai');
	}

	async renderLihatBarang(req: express.Request, resp: express.Response): Promise<void> {
		// console.log('render detail barang');

		try {
			let barang: IBarangObj[] = await toko.dao.barang.bacaById(parseInt(req.params.barang_id));
			let namaLapak: string = session(req).lapak;

			if (barang[0].anggota_id != session(req).id) {
				throw Error('akses ditolak');
			}

			let hal: string = toko.render.gudang.barangLihat.render(barang[0], namaLapak);

			resp.status(200).send(hal);
		}
		catch (e) {
			util.respError(resp, e);
		}

		// console.log('render daftar barang selesai');
	}

	async renderBarangBaru(req: express.Request, resp: express.Response): Promise<void> {
		// console.log('render barang baru');

		try {
			let lapakId: number = session(req).id;
			let namaLapak: string = session(req).lapak;

			let hal: string = toko.render.gudang.barangBaru.render(lapakId, namaLapak);

			resp.status(200).send(hal);
		}
		catch (e) {
			util.respError(resp, e);
		}

		// console.log('render daftar barang selesai');
	}

	private async gambarTulisDisk(p: string, data: any): Promise<void> {
		// ('gambar tulis disk ' + p);
		return new Promise((resolve, reject) => {
			fs.writeFile(p, data, (err) => {
				if (err) {
					console.error(err);
					reject(err);
				}
				else {
					resolve();
				}
			});
		})
	}

	async renderEditPage(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let barang: IBarangObj;
			let id: number = parseInt(req.params.barang_id);
			let namaLapak: string = session(req).lapak;

			barang = (await toko.dao.gudang.barang.bacaBarangBuatEdit(id))[0];

			barang.wa = (await toko.dao.anggota.wa(barang.anggota_id))[0].wa;

			if (barang.anggota_id != session(req).id) {
				throw Error('Akses ditolak');
			}

			if (!barang) {
				throw Error('Barang tidak ditemukan');
			}

			let hal: string = toko.render.gudang.barangEdit.render(barang, namaLapak);
			resp.status(200).send(hal);

		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async gambarUpload(req: express.Request, resp: express.Response): Promise<void> {
		try {
			// ('gambar upload');

			let buf: Buffer;

			let foto: IFoto = {
				gbr_baru: req.body.gbr_baru,
				thumb_baru: req.body.thumb_baru,
				nama_gbr: req.body.nama_gbr,
				nama_thumb: req.body.nama_thumb
			}

			//simpan gbr besar
			buf = Buffer.from(foto.gbr_baru, 'base64');
			// (util.baseDir);
			// (toko.kons.folder_upload);
			// (foto.nama_gbr);
			await toko.cont.gudang.barang.gambarTulisDisk(util.baseDir + config.folder_upload + foto.nama_gbr, buf);

			//simpan gambar kecil
			buf = Buffer.from(foto.thumb_baru, 'base64');
			await toko.cont.gudang.barang.gambarTulisDisk(util.baseDir + config.folder_upload + foto.nama_thumb, buf);

			resp.status(200).send(JSON.stringify({
				url_thumb: toko.kons.folder_download + foto.nama_thumb,
				url_gbr: toko.kons.folder_download + foto.nama_gbr
			}));
		}
		catch (e) {
			// ('gambar updload error');
			util.respError(resp, e);
		}
	}

	async barangEdit(req: express.Request, resp: express.Response): Promise<void> {
		try {
			// console.log('post edit barang');

			let id: number = parseInt(req.body.id);
			let barangAr: IBarangObj[] = await toko.dao.barang.jmlView(id);

			(id);
			(barangAr);

			let barang: IBarangObj = (barangAr)[0];
			let jmlView = barang.jml_view;

			jmlView = Math.floor(jmlView / 2);

			let data: IBarangObj = {
				nama: v.escape(req.body.nama),
				// deskripsi: v.escape(req.body.deskripsi),
				desk_panjang: v.checkScriptErr(req.body.desk_panjang),
				harga: parseInt(req.body.harga),
				id: parseInt(req.body.id),
				publish: parseInt(req.body.publish),
				thumb: req.body.thumb,
				gbr: req.body.gbr,
				anggota_id: parseInt(req.body.anggota_id),
				jml_view: jmlView
			}

			//validasi pemilik
			if (data.anggota_id != session(req).id) {
				// console.log('edit barang bukan milik sendiri');
				// console.log('anggota id: ' + data.anggota_id + '/login id: ' + session(req).id);
				throw Error('akses ditolak');
			}

			//eksekusi
			let hasil: IHasilQuery = await toko.dao.gudang.barang.barangEdit(data);

			if (hasil.affectedRows < 1) {
				// console.log('hasil query:');
				// console.log(hasil);
				throw Error('Galat !')
			}

			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async barangBaru(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let data: IBarangObj = {
				nama: v.escape(req.body.nama),
				// deskripsi: v.escape(req.body.deskripsi),
				desk_panjang: v.checkScriptErr(req.body.desk_panjang),
				harga: v.checkAngkaErr(parseInt(req.body.harga) + '', 'Harga tidak valid'),
				publish: parseInt(req.body.publish),
				thumb: v.checkScriptErr(req.body.thumb),
				gbr: v.checkScriptErr(req.body.gbr),
				anggota_id: parseInt(req.body.anggota_id),
			}

			//TODO: [ux] validate

			// ('data baru:');
			// (data);

			await toko.dao.gudang.barang.barangBaru(data);
			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	//TODO: [ref] saat upgrade ke cloudinary, gak ada hapus file
	async barangHapus(req: express.Request, resp: express.Response): Promise<void> {
		try {

			('hapus barang');

			let id: number = parseInt(req.params.barang_id);
			let barang: IBarangObj = (await toko.dao.barang.bacaById(id))[0];

			await fileDisk.hapusFile(util.baseDir + config.folder_upload + barang.thumb)
				.catch((err) => {
					console.log("==========================")
					console.error(err);
					console.log("==========================")
				});

			await fileDisk.hapusFile(util.baseDir + config.folder_upload + barang.gbr)
				.catch((err) => {
					console.log("==========================")
					console.error(err);
					console.log("==========================")
				});

			let hasil: IHasilQuery = await toko.dao.gudang.barang.barangHapus(id);

			if (hasil.affectedRows == 0) {
				console.error(hasil);
				throw Error('Tidak ada barang yang dihapus');
			}

			resp.status(200).send('');

		}
		catch (e) {
			util.respError(resp, e);
		}
	}

}
import express from 'express';
import { readFileSync } from 'fs';
import path from 'path';
import { auth } from '../auth/Auth';
import { Kons } from './Kons';
import { util, Util } from '../Util';
import { karyawanDao } from './KaryawanDao';

class KaryawanRouter {
	init(router: express.Router) {

		//karyawan
		router.get(Kons.karyawan_daftar, auth.cont.checkAuthSession, (_req: express.Request, _res: express.Response) => {
			try {
				//TODO: check entitlement
				let filestr: string = readFileSync(path.join(util.baseDir, "/template/mnk/karyawan.html"), { encoding: "utf-8" });

				karyawanDao.daftarKaryawan().then((data: IKaryawan[]) => {
					let dataStr: string = JSON.stringify(data);
					filestr = filestr.replace('{revisi}', Util.revisi);
					filestr = filestr.replace('{data}', dataStr);
					_res.status(200).send(filestr);
				}).catch((e) => {
					util.respError(_res, e);
				})
			}
			catch (e) {
				util.respError(_res, e);
			}

		});

		//hal info karyawan
		router.get(Kons.karyawan_info, auth.cont.checkAuthSession, (_req: express.Request, _res: express.Response) => {
			try {
				let filestr: string = readFileSync(path.join(util.baseDir, "/template/mnk/karyawan.html"), { encoding: "utf-8" });

				karyawanDao.lihat(_req.params.id).then((data: IKaryawan) => {
					let dataStr: string = JSON.stringify(data);
					filestr = filestr.replace('{revisi}', Util.revisi);
					filestr = filestr.replace('{data}', dataStr);
					_res.status(200).send(filestr);

				}).catch((e) => {
					util.respError(_res, e);
				});
			}
			catch (e) {
				util.respError(_res, e);
			}

		});

	}
}

export const karyawanRouter: KaryawanRouter = new KaryawanRouter();
import express from "express";
import { auth } from "../auth/Auth";
import { util } from "../Util";
import { LapakDAo } from "./LapakDao";

export class Lapak {
	static init(): void {

	}

	static async router(router: express.Router): Promise<void> {
		router.get("/tk/lapak", (_req: express.Request, resp: express.Response) => {
			try {
				resp.status(200).send(JSON.stringify(LapakDAo.daftarLapak()));
			}
			catch (e) {
				util.respError(resp, e);
			}
		});

		router.get("/tk/lapak/:id/profile", auth.cont.checkAuthGet, () => { });
		router.get("/tk/lapak/:id/barang/", auth.cont.checkAuthGet, () => { });
		router.post("/tk/lapak", auth.cont.checkAuthGet, () => { });
		router.post("/tk/lapak/:id/edit/", auth.cont.checkAuthGet, () => { });
		router.post("/tk/lapak/:id/hapus/", auth.cont.checkAuthGet, () => { });
	}
}
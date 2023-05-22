import express from "express";
import { util } from "../Util";
import { LapakDAo } from "./LapakDao";

export class Hal {
	static async router(router: express.Router): Promise<void> {
		router.get("/", async (_req: express.Request, resp: express.Response) => {
			try {
				let barang: string = (JSON.stringify(await LapakDAo.daftarLapak()));
				let halStr: string = await util.getFile("/template/beranda.html");

				halStr.replace('{{data}}', barang);

				//replace
				resp.status(200).send(halStr);
			}
			catch (e) {
				util.respError(resp, e);
			}
		});
	}


}
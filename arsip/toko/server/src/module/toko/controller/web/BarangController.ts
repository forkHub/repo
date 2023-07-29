import express from "express";
import { util } from "../../Util";
import { toko } from "../../AppToko";
import { session } from "../../SessionData";
import { IBarangObj } from "../../Type";

export class BarangController {

    async renderHalLihatBarang(req: express.Request, resp: express.Response): Promise<void> {
        try {
            let barang: IBarangObj = (await toko.dao.web.barang.bacaById(parseInt(req.params.barang_id)))[0]
            let namaLapak: string = (await toko.dao.anggota.lapak(barang.anggota_id))[0].lapak;
            let wa: string = (await toko.dao.anggota.wa(barang.anggota_id))[0].wa;
            let userName: string = session(req).userName;

            barang.wa = wa;
            barang.lapak_nama = namaLapak;

            let hal: string = toko.render.halBarang.render(barang, userName);

            await toko.dao.barang.updateJmlView(barang.id).catch((e) => {
                util.error(e);
            });

            resp.status(200).send(hal);
        }
        catch (e) {
            util.respError(resp, e);
        }
    }
}
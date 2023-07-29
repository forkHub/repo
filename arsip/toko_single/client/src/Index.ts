import { barangDao } from "./dao/BarangDao.js";
import { Barang } from "./ent/Barang.js";
import { HalBeranda } from "./view/HalBeranda.js";

async function start(): Promise<void> {
    barangDao.onPush = (id: number) => {
        console.log('on push');
        let barang: IBarang = barangDao.getById(id);
        HalBeranda.baru(barang);
    }

    await HalBeranda.load();
    document.body.appendChild(HalBeranda.view);

    await barangDao.load();

    test;
}

function test(): void {
    barangDao.reset();
    for (let i: number = 0; i < 25; i++) {
        let barang: IBarang = new Barang();
        barang.nama = 'nama ' + i;
        barang.deskripsi = 'deskripsi ' + i;
        barang.harga = 1000;
        barangDao.push(barang);
    }
}

start().then().catch();
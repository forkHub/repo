import { barangDao } from "./dao/BarangDao.js";
import { Barang } from "./ent/Barang.js";
import { HalBeranda } from "./view/HalBeranda.js";
async function start() {
    barangDao.onPush = (id) => {
        console.log('on push');
        let barang = barangDao.getById(id);
        HalBeranda.baru(barang);
    };
    await HalBeranda.load();
    document.body.appendChild(HalBeranda.view);
    await barangDao.load();
    test;
}
function test() {
    barangDao.reset();
    for (let i = 0; i < 25; i++) {
        let barang = new Barang();
        barang.nama = 'nama ' + i;
        barang.deskripsi = 'deskripsi ' + i;
        barang.harga = 1000;
        barangDao.push(barang);
    }
}
start().then().catch();

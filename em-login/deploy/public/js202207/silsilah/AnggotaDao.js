import { Util } from "../comp/Util.js";
import { RouterKOns } from "./RouterKons.js";
export class AnggotaDao {
    async bacaAnak(anggota) {
        if (anggota.rel_id == 0) {
            console.debug('tidak ada data pasangan.');
            return [];
        }
        let h = await Util.Ajax2('post', Util.getUrl(RouterKOns.p_anggota_id_anak_baca, [anggota.id]), '');
        return JSON.parse(h);
    }
    async bacaPasangan(anggota) {
        console.group('baca pasangan api:');
        let pas = [];
        let url = Util.getUrl(RouterKOns.p_anggota_id_pas_lihat, [anggota.id]);
        let hasil = await Util.Ajax2('post', url, '');
        pas = JSON.parse(hasil);
        console.log('pasangan');
        console.log(pas);
        console.groupEnd();
        return pas;
    }
    async bacaId(id) {
        return (await Util.sql(`
            SELECT *
            FROM sl_anggota
            WHERE id = ${id}`));
    }
}

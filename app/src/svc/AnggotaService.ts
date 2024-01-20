import { IAnggota, anggotaEnt } from "../mdl/AnggotaEnt.js";

class AnggotaSvc {
    async daftarAnggota(): Promise<IAnggota[]> {
        return anggotaEnt.daftar();
    }
}

export const anggotaSvc = new AnggotaSvc();
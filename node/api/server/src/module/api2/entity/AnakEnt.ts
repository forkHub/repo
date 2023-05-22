import { dao } from "../dao/Dao";


export class AnakEnt {
    async daftar(ortuId: number, kunci: string, hal: number): Promise<ISlAnggota[]> {
        dao.anak.daftarAnak(ortuId, kunci, hal);
        return [];
    }
}
import { sm } from "../../silsilah/Silsilah";

export class AnggotaCont {
    async lihatProfileAnggota(id: number): Promise<ISlAnggota> {
        let anggota: ISlAnggota = await sm.ent.anggota.populate(id);
        await sm.ent.kerabat.muat(anggota);
        return anggota;
    }

    async lihatAnggota(id: number): Promise<ISlAnggota> {
        let anggota: ISlAnggota = await sm.ent.anggota.populate(id);
        await sm.ent.kerabat.muat(anggota);

        return anggota;
    }
}
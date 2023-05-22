import { ent } from "../entity/Entity";

export class AnakCont {
    async daftar(ortuId: number, kunci: string, hal: number): Promise<IDaftarAnak> {

        let daftar: IDaftarAnak = {
            daftar: [],
            hal: 0,
            kunci: ''
        }

        daftar.daftar = await ent.anak.daftar(ortuId, kunci, hal);

        return daftar;
    }
}
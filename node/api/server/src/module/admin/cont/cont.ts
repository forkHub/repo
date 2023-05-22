import { AnggotaCont } from "./AnggotaCont";
import { Pasangan } from "./Pasangan";
import { PasanganCont } from "./PasanganCont";

export class Cont {
	readonly anggota: AnggotaCont = new AnggotaCont();
	readonly relasi: Pasangan = new Pasangan();
	readonly relasi2: PasanganCont = new PasanganCont();
}
import { AnakEnt } from "./AnakEnt";
import { AnggotaEnt } from "./AnggotaEnt";
import { PasanganEnt } from "./PasanganEnt";

class Entity {
	readonly anak: AnakEnt = new AnakEnt();
	readonly anggota: AnggotaEnt = new AnggotaEnt();
	readonly pasangan: PasanganEnt = new PasanganEnt();
}

export var ent: Entity = new Entity();
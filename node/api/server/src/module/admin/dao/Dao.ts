import { AnakDao } from "./AnakDao";
import { AnggotaDao } from "./AnggotaDao";
import { OrtuDao } from "./OrtuDao";
import { PasanganDao } from "./PasanganDao";
import { RelDao } from "./RelDao";

export class Dao {
	readonly anggota: AnggotaDao = new AnggotaDao();
	readonly rel: RelDao = new RelDao();
	readonly anak: AnakDao = new AnakDao();
	readonly ortu: OrtuDao = new OrtuDao();
	readonly pasangan: PasanganDao = new PasanganDao();
}
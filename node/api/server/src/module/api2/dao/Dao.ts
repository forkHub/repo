// import { Anggota } from "../../silsilah/ent/Anggota";
import { AnakDao } from "./AnakDao";
import { AnggotaDao } from "./AnggotaDao";


class Dao {
    readonly anak: AnakDao = new AnakDao();
    readonly anggota: AnggotaDao = new AnggotaDao();

}

export var dao: Dao = new Dao();
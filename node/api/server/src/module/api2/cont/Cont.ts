import { AnakCont } from "./AnakCont";
import { AnggotaCont } from "./AnggotaCont";

class Cont {
	readonly anak: AnakCont = new AnakCont();
	readonly anggota: AnggotaCont = new AnggotaCont();
}

export var cont: Cont = new Cont();
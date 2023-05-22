import { sql } from "../../Sql";

export class AnakDao {
	async daftarAnak(rel_id: number, kunci: string, hal: number): Promise<ISlAnggota[]> {
		let hasil: ISlAnggota[];


		if (kunci == "") {
			if (hal == 0) {
				hasil == await sql.query(
					`SELECT *
					FROM sl_anggota
					WHERE ortu_id = ?
					ORDER BY tgl_lahir`,
					[rel_id]) as ISlAnggota[];
			}
			else if (hal > 0) {
				//TODO:
			}
			else {

			}
		}
		else if (kunci != '') {
			if (hal == 0) {

			}
			else if (hal > 0) {

			}
			else {

			}
		}

		return hasil;
	}

}
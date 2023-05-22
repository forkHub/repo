import { config } from "../../../config/Config";
import { sql } from "../../Sql";

export class AnakDao {
	async daftarCalonAnakBaru(kunci: string, bani: number, offset: number): Promise<ISlAnggota[]> {
		offset = parseInt(offset + ''); //validate number

		let where: string = '';
		let data: any[];

		if ("-" == kunci) {
			where = ` (nama = ? OR nama_lengkap = ?) AND bani = ?`;
			data = [kunci, kunci, bani];

		}
		else {
			where = ` bani = ? `;
			data = [bani];
		}

		let query: string = `
			SELECT *
			FROM sl_anggota
			WHERE ${where}
			LIMIT ${config.jmlPerHal}
			OFFSET ${offset}
		`;

		let hasil: ISlAnggota[] = await sql.query(query,
			data) as ISlAnggota[];

		return hasil;


		return []//todo;
	}

	async daftarAnak(rel_id: number): Promise<ISlAnggota[]> {
		let hasil: ISlAnggota[] = await sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE ortu_id = ?
			ORDER BY tgl_lahir`,
			[rel_id]) as ISlAnggota[];

		return hasil;
	}

}
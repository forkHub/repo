import { config } from "../../../config/Config";
import { sql } from "../../Sql";

export class PasanganDao {

	async lihatPasangan(id: number, relId: number): Promise<ISlAnggota[]> {
		return await sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE id != ?  AND rel_id = ? 
		`, [id, relId]) as ISlAnggota[];
	}

	async jmlCariPasangan(kunci: string, offsetAbs: number, jkl: string): Promise<number> {
		let kunciSql: string = `%${kunci}%`;
		let where: string;
		let data: any[] = [];

		offsetAbs = parseInt(offsetAbs + '');

		if (("-" == kunci) || ("---" == kunci) || ("" == kunci)) {
			where = "WHERE  1  AND jkl = ? ";
			data = [jkl];
		}
		else {
			where = ` 
				WHERE (
					nama LIKE ? 
					OR nama_lengkap LIKE ?
				)
				AND jkl = ?
			`;
			data = [kunciSql, kunciSql, jkl];
		}

		let hasil: IJUmlah[] = await sql.query(`
			SELECT COUNT(id) as jumlah
			FROM sl_anggota
			${where}
		`, data) as IJUmlah[];

		return hasil[0].jumlah;
	}

	async daftarCalonPasangan(kunci: string, offsetAbs: number, jkl: string): Promise<ISlAnggota[]> {
		let kunciSql: string = `%${kunci}%`;
		let where: string;
		let data: any[] = [];

		offsetAbs = parseInt(offsetAbs + '');

		if (("-" == kunci) || ("---" == kunci) || ("" == kunci)) {
			where = "WHERE  1 AND jkl = ? ";
			data = [jkl];
		}
		else {
			where = ` 
				WHERE (nama LIKE ? OR nama_lengkap LIKE ?)  
				AND jkl = ?
			`;
			data = [kunciSql, kunciSql, jkl];
		}

		return await sql.query(` 
			SELECT *
			FROM sl_anggota
			${where}
			ORDER BY NAMA
			LIMIT ${config.jmlPerHal}
			OFFSET ${offsetAbs}
		`, data);
	}

}
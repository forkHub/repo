import { sql } from "../../Sql";

export class PasanganDao {

	async lihatPasangan(id: number, relId: number): Promise<ISlAnggota[]> {
		return await sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE id != ?  AND rel_id = ? 
		`, [id, relId]) as ISlAnggota[];
	}

}
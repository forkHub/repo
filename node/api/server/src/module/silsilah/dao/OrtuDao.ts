import { sql } from "../../Sql";

export class OrtuDao {

	async lihatOrtu(relId: number): Promise<ISlAnggota[]> {
		return await sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE rel_id = ?
		`, [relId]) as ISlAnggota[];
	}
}
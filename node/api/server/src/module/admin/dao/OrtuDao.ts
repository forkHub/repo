import { sql } from "../../Sql";

export class OrtuDao {
	async updateOrtu(id: number, idOrtu: number) {
		return await sql.query(`
			UPDATE sl_anggota
			SET ortu_id = ?
			WHERE id = ?
		`, [idOrtu, id]) as unknown as IHasilQuery
	}

	async lihatOrtu(relId: number): Promise<ISlAnggota[]> {
		return await sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE rel_id = ?
		`, [relId]) as ISlAnggota[];
	}

	//TODO: [next]

}
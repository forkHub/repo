import { sql } from "../../Sql";

export class RelDao {

	async byId(id: number): Promise<ISlRelasi[]> {
		return await sql.query(`
            SELECT *
            FROM sl_relasi
            WHERE id = ?
        `, [id]) as ISlRelasi[];
	}

	async baru(): Promise<IHasilQuery> {
		return await sql.query(`INSERT INTO sl_relasi () VALUES ()`, []) as unknown as IHasilQuery;
	}

}
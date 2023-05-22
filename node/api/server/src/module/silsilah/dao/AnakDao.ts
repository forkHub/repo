import { sql } from "../../Sql";

export class AnakDao {

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
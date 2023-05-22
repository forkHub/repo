import { sql } from "../../Sql";
import { config } from "../../../config/Config";

export class AnggotaDao {

	//TODO: [ref] dibuat lebih sepesifik
	async baca(select: string, where: string, offset: number, order: string, data: any[]): Promise<ISlAnggota[]> {

		offset = parseInt(offset + ''); //validate number

		let query: string = `
			SELECT ${select}
			FROM sl_anggota
			${where}
			${order}
			LIMIT ${config.jmlPerHal}
			OFFSET ${offset}
		`;

		let hasil: ISlAnggota[] = await sql.query(query,
			data) as ISlAnggota[];

		return hasil;
	}

	async lihat(id: number): Promise<ISlAnggota[]> {
		return await sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE id = ?
		`, [id]) as ISlAnggota[];
	}
}
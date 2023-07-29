import { sql } from "../Sql";
import { IAnggotaObj, IHasilQuery } from "../Type";

export class AnggotaDao {

	async info(id: number): Promise<IAnggotaObj[]> {
		return await sql.query(`SELECT * FROM tk_anggota WHERE id = ?`, [id]) as IAnggotaObj[];
	}

	async profile(id: number): Promise<IAnggotaObj[]> {
		return await sql.query(`
            SELECT id, user_name, alamat, email, lapak, deskripsi, wa
            FROM tk_anggota
            WHERE id = ?
        `, [id]);
	}

	async lapak(anggotaId: number): Promise<IAnggotaObj[]> {
		return await sql.query(`SELECT lapak, deskripsi FROM tk_anggota WHERE id = ?`, [anggotaId]);
	}

	async daftarLapak(): Promise<IAnggotaObj[]> {
		return await sql.query(`
            SELECT id, lapak, deskripsi 
			FROM tk_anggota 
			WHERE aktif = 1
        `, [])
	}

	async userName(id: number): Promise<IAnggotaObj[]> {
		return await sql.query(`
            SELECT user_name
            FROM tk_anggota
            WHERE id = ?
        `, [id])
	}

	async wa(id: number): Promise<IAnggotaObj[]> {
		return await sql.query(`
            SELECT wa
            FROM tk_anggota
            WHERE id = ?
        `, [id])
	}

	/**
	 * userName, lapak, wa
	 * @param id 
	 * @returns 
	 */
	async info1(id: number): Promise<IAnggotaObj[]> {
		return await sql.query(`
            SELECT user_name, lapak, wa
            FROM tk_anggota
            WHERE id = ?
        `, [id])
	}

	async edit(id: number, anggota: IAnggotaObj): Promise<IHasilQuery> {
		return await sql.query(`
            UPDATE tk_anggota
            SET ?
            WHERE id = ?
        `, [anggota, id]) as unknown as IHasilQuery;
	}




}
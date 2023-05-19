import { v } from "../../Validator";
import { toko } from "../../AppToko";
import { IAnggotaObj, IHasilQuery } from "../../Type";

export class ProfileDao {

	async editProfile(anggota: IAnggotaObj, id: number): Promise<IHasilQuery> {
		let data: IAnggotaObj = {
			user_name: v.escape(anggota.user_name),
			alamat: v.escape(anggota.alamat),
			deskripsi: v.escape(anggota.deskripsi),
			email: v.escape(anggota.email),
			lapak: v.escape(anggota.lapak),
			wa: v.escape(anggota.wa)
		}

		//TODO: [ux] validate

		return await toko.dao.anggota.edit(id, data);
	}

	async editPassword(id: number, password: string): Promise<IHasilQuery> {
		return await toko.dao.anggota.edit(id, {
			password: password
		});
	}

}
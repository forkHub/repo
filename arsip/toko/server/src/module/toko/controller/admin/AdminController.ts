import { toko } from "../../AppToko";


export class AdminController {
	async hapusAnggota(id: number): Promise<void> {
		let hasil: any = await toko.dao.admin.AdminDao.hapusAnggota(id);
		await hasil;
	}

	async hapusAnggotaByUserName(userName: string): Promise<void> {
		let hasil: any = await toko.dao.admin.AdminDao.hapusAnggotaByUserName(userName);
		await hasil;
	}

	async hapusSemuabarang(): Promise<void> {
		await toko.dao.admin.AdminDao.hapusSemuaBarang();
	}

	async daftarAnggota(): Promise<any> {
		return await toko.dao.admin.AdminDao.daftarAnggota();
	}
}
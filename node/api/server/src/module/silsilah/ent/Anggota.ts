import { sm } from "../Silsilah";

export class Anggota {

	/**
	 * Muat pasangan
	 * @param anggota 
	 * @returns 
	 */
	async muatPasangan(anggota: ISlAnggota): Promise<void> {
		let pasAr: ISlAnggota[];
		let pas: ISlAnggota;

		// console.group('muat pasangan:');

		if (anggota.rel_id <= 0) {
			// console.log('rel_id tidak ada');
			// console.groupEnd();
			return;
		}

		pasAr = await sm.dao.pasangan.lihatPasangan(anggota.id, anggota.rel_id);
		pas = pasAr[0];

		anggota.pas = pas;

		// console.log('data pasangan:');
		// console.log(anggota.pas);
		// console.groupEnd();
	}

	/**
	 * Muat pasangan dan anak
	 * @param id 
	 * @returns 
	 */
	async populate(id: number,): Promise<ISlAnggota> {
		let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
		let anggota: ISlAnggota = anggotaAr[0]

		//pasangan info
		if (anggota.rel_id > 0) {
			await this.muatPasangan(anggota);
			anggota.rel = (await sm.dao.rel.byId(anggota.rel_id))[0];
			anggota.anak = (await sm.dao.anak.daftarAnak(anggota.rel_id))
		}
		else {
			anggota.anak = [];
		}

		return anggota;
	}
}
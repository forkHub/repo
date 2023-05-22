import { sm } from "../Silsilah";

export class Kerabat {
	async muat(anggota: ISlAnggota): Promise<void> {

		//ortu
		anggota.ortu = [];
		await this.ortu(anggota, anggota.ortu);

		//mbah
		anggota.mbah = [];
		await this.mbah(anggota.ortu, anggota.mbah);

		//saudara
		anggota.saudara = [];
		await this.muatSaudara(anggota, anggota.saudara);

		//lek
		anggota.lek = [];
		await this.lek(anggota.ortu, anggota.lek);

		//sepupu
		anggota.sepupu = [];
		await this.sepupu(anggota.lek, anggota.sepupu);

		//ponakan
		anggota.ponakan = [];
		await this.ponakan(anggota.saudara, anggota.ponakan);

		//cucu
		anggota.cucu = [];
		await this.cucu(anggota.anak, anggota.cucu);
	}

	async cucu(anakAr: ISlAnggota[], data: ISlAnggota[]): Promise<void> {
		try {
			for (let i: number = 0; i < anakAr.length; i++) {
				let anak: ISlAnggota = anakAr[i];
				await this.anak(anak, data);
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	async ponakan(saudaraAr: ISlAnggota[], data: ISlAnggota[]): Promise<void> {
		try {
			for (let i: number = 0; i < saudaraAr.length; i++) {
				let saudara: ISlAnggota = saudaraAr[i];
				await this.anak(saudara, data);
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	async muatRel(id: number): Promise<ISlRelasi> {
		try {
			return (await sm.dao.rel.byId(id))[0];
		}
		catch (e) {
			console.error(e);
		}

		return null;
	}

	async muatAnggota(id: number): Promise<ISlAnggota> {
		try {
			return (await sm.dao.anggota.lihat(id))[0]
		}
		catch (e) {
			console.error(e);
		}

		return null;
	}

	async anak(anggota: ISlAnggota, daftar: ISlAnggota[]): Promise<void> {
		try {
			if (anggota.rel_id <= 0) return;

			let rel: ISlRelasi = await this.muatRel(anggota.rel_id);
			if (!rel) return;

			let anakAr: ISlAnggota[] = await sm.dao.anak.daftarAnak(rel.id);

			anakAr.forEach((item: ISlAnggota) => {
				daftar.push(item);
			});
		}
		catch (e) {
			console.error(e);
		}
	}

	async muatSaudara(anggota: ISlAnggota, daftar: ISlAnggota[]): Promise<void> {
		try {
			if (anggota.ortu_id <= 0) return;

			let anak: ISlAnggota[] = await sm.dao.anak.daftarAnak(anggota.ortu_id);

			anak.forEach((item: ISlAnggota) => {
				if (item.nama_lengkap != anggota.nama_lengkap) {
					daftar.push(item);
				}
			});
		}
		catch (e) {
			console.error(e);
		}
	}

	async sepupu(lekAr: ISlAnggota[], daftar: ISlAnggota[]): Promise<void> {
		try {
			for (let i: number = 0; i < lekAr.length; i++) {
				let lek: ISlAnggota = lekAr[i];
				await this.anak(lek, daftar);
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	async lek(ortuAr: ISlAnggota[], daftar: ISlAnggota[]): Promise<void> {
		try {
			for (let i: number = 0; i < ortuAr.length; i++) {
				let ortu: ISlAnggota = ortuAr[i];
				await this.muatSaudara(ortu, daftar);
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	async mbah(ortu: ISlAnggota[], daftar: ISlAnggota[]): Promise<void> {
		try {
			for (let i: number = 0; i < ortu.length; i++) {
				let item: ISlAnggota = ortu[i];
				this.ortu(item, daftar);
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	async ortu(anggota: ISlAnggota, daftar: ISlAnggota[]): Promise<void> {
		try {
			if (anggota.ortu_id == 0) return;

			let relOrtu: ISlRelasi = await this.muatRel(anggota.ortu_id);
			if (!relOrtu) return;

			let ortu: ISlAnggota[] = await sm.dao.ortu.lihatOrtu(relOrtu.id);
			if (!ortu) return;
			if (ortu.length == 0) return;

			ortu.forEach((item: ISlAnggota) => {
				daftar.push(item);
			})
		}
		catch (e) {
			console.error(e);
		}
	}
}
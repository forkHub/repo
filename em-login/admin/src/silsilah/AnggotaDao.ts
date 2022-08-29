
namespace ha.sl {
	class AnggotaDao {

		async bacaAnak(anggota: ISlAnggota): Promise<ISlAnggota[]> {

			if (anggota.rel_id == 0) {
				console.debug('tidak ada data pasangan.');
				return [];
			}

			let h: string = await ha.comp.Util.Ajax2('post', RouterKOns.server + ha.comp.Util.getUrl(RouterKOns.p_anggota_id_anak_baca, [anggota.id]), '');
			return JSON.parse(h) as ISlAnggota[];
		}

		async bacaPasangan(anggota: ISlAnggota): Promise<ISlAnggota[]> {
			// console.group('baca pasangan api:');
			let pas: ISlAnggota[] = [];

			let url: string = RouterKOns.server + ha.comp.Util.getUrl(RouterKOns.p_anggota_id_pas_lihat, [anggota.id]);
			console.debug('url ' + url);

			let hasil: string = await ha.comp.Util.Ajax2('post', url, '');
			pas = JSON.parse(hasil) as ISlAnggota[];

			// console.log('pasangan');
			// console.log(pas);

			// console.groupEnd();

			return pas;
		}

		// async bacaId(id: number): Promise<ISlAnggota[]> {
		// 	return (await ha.comp.Util.sql(`
		// 		SELECT *
		// 		FROM sl_anggota
		// 		WHERE id = ${id}`));
		// }
	}

	export var anggotaDao = new AnggotaDao();
}


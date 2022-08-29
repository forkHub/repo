//TODO: final2
class Url {
	readonly urlBase: string = 'http://localhost:3000';
	readonly profile: string = '/penjual/profile';
	readonly urlFileUpload: string = '/penjual/upload';
	readonly urlPenjualProfile: string = '/penjual/profile/:id';
	readonly urlPenjualGetEditProfile: string = '/penjual/profile/edit/:id';
	readonly urlPenjualPostEditProfile: string = '/penjual/profile/edit/';
	readonly urlPenjualBeranda: string = '/penjual/beranda/:id';

	readonly urlPenjualBarangBaru: string = '/penjual/barang/baru';
	readonly urlPenjualEditBarangGet: string = '/penjual/barang/edit/:id';
	readonly urlPenjualEditBarangPost: string = '/penjual/barang/edit';
	readonly urlPenjualHapusBarang: string = '/penjual/barang/hapus';

	readonly urlAuthLogin: string = '/auth/login';
	readonly urlAuthLogout: string = '/auth/logout';
	readonly urlAuthGantiPass: string = '/auth/ganti';
	readonly urlAuthLupaPass: string = '/auth/lupa';
	readonly urlAuthDaftar: string = '/auth/daftar';

	readonly urlTokoLapak: string = `/lapak/:id`;
	readonly urlTokoBarang: string = `/barang/baca/id/:id`;
	readonly urlTokoBeranda: string = '/';

	readonly urlBarangCariGet: string = '';

	getUrl(url: string, params: string[]): string {
		let urlHasil: string = url;

		console.log('get url: ' + urlHasil);

		params.forEach((item: string) => {
			urlHasil = urlHasil.replace(/\:[a-z]+/, item);
			console.log('item ' + item);
			console.log('url ' + urlHasil);
		});

		return urlHasil;
	}
}

export var url: Url = new Url;
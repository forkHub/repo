import { Gudang } from "./gudang/Gudang";
import { HalBarang } from "./web/HalBarang";
import { HalDepanRenderer } from "./web/HalDepanRender";
import { HalDaftarLapak } from "./web/HalDaftarLapak";
import { Auth } from "./auth/Auth";
import { HalLapak } from "./web/HalLapak";
import { toko } from "../AppToko";
import { config } from "../Config";
import { Param } from "../Param";

export class Renderer {
	readonly halDepan: HalDepanRenderer = new HalDepanRenderer();
	readonly halBarang: HalBarang = new HalBarang();
	readonly halDaftarLapak: HalDaftarLapak = new HalDaftarLapak();
	readonly halLapak: HalLapak = new HalLapak();

	readonly gudang: Gudang = new Gudang();
	readonly auth: Auth = new Auth();


	login(userName: string): string {
		let hasil: string = `<div class="text-align-right">`;

		if (userName && userName != '') {
			hasil += `<a bold href="${toko.router.toko_gudang_barang_daftar}">${userName}</a> | <a href="${toko.router.toko_auth_logout}">logout</a>`;
		}
		else {
			hasil += `<a href="${toko.router.toko_auth_login}">login</a>`;
		}

		hasil += '</div>';

		return hasil;
	}

	nav(cari: boolean): string {
		return `
			<!-- NAV BAR -->
			<nav class="navbar navbar-expand-lg navbar-light bg-light margin-bottom-8">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">${config.namaToko}</a>

					${this.cari(cari)}
				</div>
			</nav>
		`;
	}

	public cari(status: boolean): string {
		if (!status) return '';

		return `
			<div class="" id="navbarSupportedContent">
				<form method="get" type="cari" class="d-flex" action_url="${toko.router.toko_web_beranda_cari_kataKunci_hal_hal}">
					<input class="form-control me-2" type="search" name="cari" placeholder="Search" aria-label="Search" required>
					<button class="btn btn-outline-success" type="submit">Cari</button>
				</form>
			</div>`
	}

	upload(thumb: string): string {
		('render upload');

		return `
			<div class='background disp-none upload-gambar padding-16'>
				<div class='box padding-8 bg-putih'>
					<div class='text-align-right'>
						<button class='btn btn-primary tutup' ${Param.HA_KLIK} ${Param.HA_TOGGLE}="div.upload-gambar">X</button>
					</div>

					<form 
						action="${toko.router.toko_gudang_barang_foto_update}"
						method="post"
						class='cont upload'
						${Param.HA_MANUAL}
						>

						<div class="form-group">
							<label for="thumb">Gambar:</label><br/>
							<img class="img-ori disp-block" src="${thumb}"><br/>
							<input type="file">
						</div>
					
						<div class='thumb-cont disp-none'>
						</div>

						<div class='foto-cont disp-none'>
						</div>
						
						<button type='submit' class='btn btn-primary upload'>Upload</button>
					</form>
				</div>
			</div>

		`;
	}


}
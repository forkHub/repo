import { Util, util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { IBarangObj } from "../../Type";

export class HalBeranda {
	render(barangAr: IBarangObj[], namaLapak: string, idLapak: number, lapakAktif: number): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>${config.namaToko} - gudang</title>

				<meta name="viewport" content="width=device-width, initial-scale=1">                    

				<meta property="og:site_name" content="${config.namaToko}">
				<meta property="og:title" content="${config.namaToko}" />
				<meta property="og:description" content="${config.deskripsiToko}" />
				<meta name="description" content="${config.deskripsiToko}" />
				<meta property="og:image" itemprop="image" content="">
				<meta property="og:type" content="website" />
				<meta property="og:url" content="${config.website}">
				<meta property="og:updated_time" content="1440432930" />

				<link rel='stylesheet' href='/css/bootstrap.min.css' rel='stylesheet' />
				<link rel='stylesheet' href="/css/css.css?r=${util.randId}" />
				<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />
				
				<link rel='stylesheet' href="/css/font/css/fontello.css?r=${util.randId}" />
				<link rel='stylesheet' href="/css/font/css/fontello-codes.css?r=${util.randId}" />

			</head> 

			<!-- SINKRONISASI TAB BARANG - TAB PROFILE -->
			<body data-id=${idLapak} data-host=${config.website} data-aktif=${lapakAktif}>
				<div class='container'>
					<!-- NAV BAR -->
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<a class="navbar-brand" href="#">${namaLapak}</a>											
						</div>
					</nav>

					<div class="text-align-right">
						<a href="${toko.router.toko_auth_logout}">logout</a>
					</div>

					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a class='beranda' href="${toko.router.toko_web_beranda}">🏪</a></li>
							<li class="breadcrumb-item active" aria-current="page">gudang</li>
						</ol>
					</nav>

					<!-- SINKRONISASI TAB BARANG - TAB PROFILE -->
					<ul class="nav nav-tabs">
						<li class="nav-item">
							<a class="nav-link active" href="#">barang (${barangAr.length}/${config.jmlMaxBarangPerGudang})</a>
						</li>
						<li class="nav-item">
							<a class="ul li nav-link" href="${toko.router.toko_gudang_profile}">profile</a>
						</li>
						<li class="nav-item">
							<a class="ul li nav-link icon-menu popup-menu" href="#"></a>
						</li>
					</ul>

					<br/>

					<div class='cont'>
						${this.daftarBarang(barangAr)}
					</div>
				</div>
				<br/>
				<br/>

				${this.renderTombolTambahBarang(barangAr.length)}

				<!-- SINKRONISASI TAB BARANG - TAB PROFILE -->
                <script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
                <script type="module" src="/js${Util.revisi}/toko/Gudang.js?r=${util.randId}"></script>
			</body>
		</html>`;
	}

	private daftarBarang(barangAr: IBarangObj[]): string {
		let hasil: string = '';

		if (barangAr.length <= 0) {
			return '<div>Belum ada data</div>';
		}

		barangAr.forEach((barang: IBarangObj) => {
			let el: string = `
			<div class='list-group' id=${barang.id}>
				<a class="list-group-item list-group-item-action" href="${util.getUrl(toko.router.toko_gudang_barang_lihat_barangId, [barang.id + ''])}">
					<div class='row'>
						<div class="col-md-2 col-4 col-lg-1 text-align-center tengah-tengah">
							<img src="${barang.thumb ? (toko.kons.folder_download + barang.thumb) : "/gbr/thumb.png"}">
						</div>
						<div class="col-md-10 col-8 col-lg-11">
							<div class='text-align-right'>${util.dateTimeStamp(barang.tgl_update)}</div> 
							<div class=''><span>${this.draft(barang.publish)}</span>${barang.nama}</div>
							<div class=''>${barang.harga}</div>
						</div>
					</div>
				</a>
			</div>`;
			hasil += el;
		})

		return hasil;
	}

	private renderTombolTambahBarang(jmlBarang: number): string {
		if (jmlBarang >= config.jmlMaxBarangPerGudang) {
			return '';
		}

		return `<a class="tambah" href='${toko.router.toko_gudang_barang_baru}'>+</a>`;
	}

	private draft(publish: number): string {
		if (publish == 3) return ""
		return "[draft] ";
	}
}
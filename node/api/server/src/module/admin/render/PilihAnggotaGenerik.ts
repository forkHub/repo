import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { config } from "../../../config/Config";
import { admin } from "../admin";
import { RouterKons } from "../RouterKons";

export class PilihAnggotaGenerik {
	render(
		anggotaAr: ISlAnggota[],
		anggotaSumber: ISlAnggota,
		urlPost: string,
		urlCari: string,
		judul: string,
		kunci: string,
		jmlAbs: number,
		offsetLog: number): string {

		//console.log('render pilih anggota');
		//console.log('offset log: ' + offsetLog)

		return `
		<!DOCTYPE html>
		<html lang="id">

		<head>
			<title>${config.judul}</title>

			<meta name="viewport" content="width=device-width, initial-scale=1">
			
			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />

		</head>

		<body>
			<div class="cont container pilih anggota">

				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
					<li class="breadcrumb-item"><a class='' href="${util.getUrl(RouterKons.daftarAnggota, [])}">daftar</a></li>
					<li class="breadcrumb-item"><a class='' href="${util.getUrl(RouterKons.halEditAnggota, [anggotaSumber.id])}">edit</a></li>
					<li class="breadcrumb-item active" aria-current="page">pilih</li>
					</ol>
				</nav>

				<h5>${judul}</h5>
				
				${admin.render.renderCari(true, urlCari, anggotaSumber)}

				<hr/>	

				<div class='info-cari text-align-center'>
					${this.infoCari(kunci, urlCari, anggotaSumber)}
				</div> 

				<div class='post-cont'>
					${this.daftarAnggota(anggotaAr, anggotaSumber, urlPost)}
				</div>

				<nav aria-label="Page navigation example" style="text-align:center">
				</nav>

				${util.hal2(offsetLog, jmlAbs, kunci, urlCari, config.jmlPerHal, anggotaSumber)}

    		</div>
			
			<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>

		</body>
		</html>`;
	}

	private daftarAnggota(anggotaAr: ISlAnggota[], anggotaSumber: ISlAnggota, url: string): string {
		let hasil: string = ``;

		if (anggotaAr.length == 0) {
			return `<div>tidak ada data</div>`;
		}

		anggotaAr.forEach((anggota: ISlAnggota) => {
			let el: string = `
			<div class='item list-group' id=${anggota.id}>
				<a 
					class="list-group-item list-group-item-action" 
					href="#"
					${Param.HA_KLIK}
					${Param.HA_POST}=${this.getUrlPost(url, anggota, anggotaSumber)}
					${Param.HA_URL}=${util.getUrl(RouterKons.halEditAnggota, [anggotaSumber.id + ''])}
				> 
					<div class=''>${anggota.nama_lengkap}</div>
				</a>
			</div>`;

			hasil += el;
		});

		return hasil;
	}

	private getUrlPost(url: string, anggotaDipilih: ISlAnggota, anggotaSumber: ISlAnggota): string {
		if (url == RouterKons.editRelasi) {
			return util.getUrl(url, [anggotaDipilih.id, anggotaSumber.rel_id]);
		}
		else if (url == RouterKons.editOrtu) {
			return util.getUrl(url, [anggotaDipilih.id, anggotaSumber.rel_id]);
		}
		else {
			throw Error('url invalid ' + url);
		}

	}

	private infoCari(kunci: string, path: string, anggota: ISlAnggota): string {
		//console.log('info cari, kunci: ' + kunci + '/path: ' + path + '/anggota: ' + anggota);
		if ('-' == kunci) {
			return '';
		}
		else {
			return `
				<p> menampilkan pencarian berdasar kata kunci "${decodeURI(kunci)}"</p>
				<a href="${util.getUrlCari('-', 0, path, anggota)}">tampilkan semua hasil</a>
				<hr/>
			`
		}
	}


}
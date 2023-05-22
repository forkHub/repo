import { Util, util } from "../Util";
import { config } from "../../config/Config";
import { RouterKOns } from "./RouterKons";
import * as admin from "../admin/RouterKons";

export class HalProfile {
	render(anggota: ISlAnggota): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
		
		<head>
			<title>${config.judul}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">

			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link href='/css/font/css/fontello.css' rel='stylesheet' />
			<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />
		</head>
		
		<body>
			<div class="cont container profile">

				<nav aria-label="breadcrumb disp-none" class="disp-none">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a class='beranda' href="/">🏠</a></li>
						<li class="breadcrumb-item active" aria-current="page">profile</li>
					</ol>
				</nav>
				
				<div class="form-group disp-none display-none" >
					<h5>foto:</h5>
					<img class="img-asli" src="${(anggota.foto != '') ? anggota.foto : '/gbr/profile128.png'}">
				</div>

				<h1>Hal Profile:</h1>
		
				<div class='Profile'>
					<hr/>
					<h5>Profil:</h5>
		
					<p class="text-secondary mb-1 font-weight-bold">nama:</p>
					<p class="text-muted font-size-sm">${anggota.nama}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">nama lengkap:</p>
					<p class="text-muted font-size-sm">${util.stringNull(anggota.nama_lengkap)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">jkl:</p>
					<p class="text-muted font-size-sm">${anggota.jkl}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">alamat:</p>
					<p class="text-muted font-size-sm">${util.stringNull(anggota.alamat)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">tgl-lahir:</p>
					<p class="text-muted font-size-sm">${util.dateTimeStamp(anggota.tgl_lahir)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">tgl-meninggal:</p>
					<p class="text-muted font-size-sm">${util.dateTimeStamp(anggota.tgl_meninggal)}</p>
								
				</div>

				<div class='pasangan'>
					<hr/>
					<h5>pasangan:</h5>
					${this.renderPasangan(anggota)}
				</div>


				<div class='anak'>
					<hr/>
					<h5>anak:</h5>
					${this.renderDaftarAnak(anggota.anak)}
				</div>

				<div class='kerabat'>
					<hr/>
					<h5>kerabat:</h5>
					${this.renderKerabat(anggota)}
				</div>
				
				<hr/>
				<h1>Tautan:</h1>

				<div class=''>
					<a href="${this.renderHrefEditAnggota(anggota)}" class="">Edit Profile</a>
				</div>

				<div>
					<a href="${util.getUrl(RouterKOns.berandaId, [anggota.id])}">Hal Silsilah</a>
				</div>

			</div> <!-- end of profile -->
			<br/>
			<br/>
			<br/>


			<script type="module" src="/js/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
		</body>
		
		</html>
        `;
	}

	renderHrefEditAnggota(anggota: ISlAnggota): string {
		return `${util.getUrl(admin.RouterKons.editProfile, [anggota.id])}`; //TODO:
	}

	renderLink(link: string): string {
		return `<a href="${util.stringHrefNull(link)}">${util.stringNull(link)}</a>`;
	}

	// private renderTautan(anggota: ISlAnggota): string {
	// 	return `<a href="${util.getUrl(RouterKOns.berandaId, [anggota.id])}">tautan silsilah</a>`;
	// }

	private renderPasangan(anggota: ISlAnggota): string {
		if (anggota.pas) {
			return `
			<a class="pasangan" href='${util.getUrl(RouterKOns.lihatProfile, [anggota.pas.id])}'>${anggota.pas.nama}</a>`;
		}
		else {
			return `<p class="text-muted font-size-sm">tidak ada data</p>`;
		}
	}

	private renderKerabat(anggota: ISlAnggota): string {
		let hasil: string = '';

		hasil += this.renderDaftar(anggota.mbah, 'mbah');
		hasil += this.renderDaftar(anggota.ortu, 'orang tua');
		hasil += this.renderLek(anggota);
		hasil += this.renderDaftar(anggota.saudara, 'saudara');
		hasil += this.renderDaftar(anggota.sepupu, 'sepupu');
		hasil += this.renderDaftar(anggota.ponakan, 'ponakan');
		hasil += this.renderDaftar(anggota.cucu, 'cucu');

		return hasil;
	}

	private tglLebihBesar(tgl1: string, tgl2: string): boolean {
		let hasil: boolean;
		let tgl1a: Date = new Date(tgl1);
		let tgl2a: Date = new Date(tgl2);

		hasil = tgl1a > tgl2a;

		// console.log('check tanggal lebih besar');
		// console.log('tgl 1 ' + tgl1);
		// console.log('tgl 2 ' + tgl2);
		// console.log('tgl 1 ' + tgl1a);
		// console.log('tgl 2 ' + tgl2a);
		// console.log('hasil ' + hasil);
		// console.log('');

		return hasil;
	}

	private renderLek(anggota: ISlAnggota): string {
		let hasil: string = '';
		let dhe: string = '';

		// console.log('render lek, anggota:');
		// console.log(anggota);
		// console.log('');

		anggota.lek.forEach((item: ISlAnggota) => {
			if (item.jkl == 'l') {
				if (this.tglLebihBesar(anggota.tgl_lahir, item.tgl_lahir)) {
					dhe = 'pakdhe';
				}
				else {
					dhe = 'paklek';
				}
				hasil += this.renderDaftar([item], dhe);
			}
			else {
				if (this.tglLebihBesar(anggota.tgl_lahir, item.tgl_lahir)) {
					dhe = 'budhe';
				}
				else {
					dhe = 'bulek';
				}
				hasil += this.renderDaftar([item], dhe);
			}
		});

		return hasil;
	}

	private renderDaftar(daftar: ISlAnggota[], label: string): string {
		let hasil: string = '';

		daftar.forEach((anggota: ISlAnggota) => {
			let el: string = `
			<div class='margin-bottom-8' id=${anggota.id}>
				<a class="" href="${util.getUrl(RouterKOns.lihatProfile, [anggota.id])}">${anggota.nama_lengkap} (${label})</a>
			</div>`;

			hasil += el;
		});

		return hasil;
	}

	private renderDaftarAnak(anggotaAr: ISlAnggota[]): string {

		let hasil: string = ``;

		if (anggotaAr.length == 0) {
			return `<p class="text-muted font-size-sm">tidak ada data</p>`;
		}

		anggotaAr.forEach((anggota: ISlAnggota) => {
			let el: string = `
			<div class='margin-bottom-8' id=${anggota.id}>
				<a class="" href="${util.getUrl(RouterKOns.lihatProfile, [anggota.id])}">${anggota.nama_lengkap}</a>
			</div>`;

			hasil += el;
		});

		return hasil;
	}

}

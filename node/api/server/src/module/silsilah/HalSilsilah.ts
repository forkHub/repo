import { util, Util } from "../Util";
import { RouterKOns } from "./RouterKons";

export class HalSilsilah {
	render(data: ISlAnggota): string {
		return `
			<html>

			<head>
				<meta name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, target-densityDpi=device-dpi">
					<link rel="stylesheet" href='/css/css.css?r=${util.randId}' />
					<link rel="stylesheet" href='/css/umum.css?r=${util.randId}' />
					<link rel="stylesheet" href='/css/silsilah.css?r=${util.randId}' />
			</head>
			
			<body>
				
				<div class='silsilah-cont'>

				</div>

				<hr/>
				
				<div class='tautan'>
					${this.tautanOrtu(data)}
				</div>

				<template>

					<div class="cont anggota-cont disp-table-cell">
						
						<div class="hubung-cont">
						</div>

						<div class="atas disp-table">
							<div class="utama disp-table-cell text-align-center">
								<div class="hubung-cont utama">
								</div>
								<div class='foto-cont'>
									<div class='foto'></div>
									<img src="" class="foto padding">
									<div class="nama text-align-center"></div>
									<div class='text-align-center margin-bottom-8'>
										<button class="profile"> profile </button>
									</div>
								</div>
							</div>
			
							<div class="pasangan display-none text-align-left">
								<div class="hubung-cont istri">
								</div>
								<div class='foto-cont'>
									<div class='foto'></div>
									<img src="" class="foto padding">
									<div class="nama text-align-center"></div>
									<div  class='text-align-center margin-bottom-8'>
										<button class="profile"> profile </button>
									</div>
								</div>
							</div>
						</div>

						<div class="bawah display-none">
			
						</div>
					</div>

				</template>
				<script>
					var data = ${JSON.stringify(data)}
				</script>
				<script type='module' src='/js/js${Util.revisi}/silsilah/Silsilah.js?r=${util.randId}'></script>
				<script type="module" src="/js/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
				</body>
			</html>
		`;
	}

	private ayahIbu(data: ISlAnggota): string {
		if (data.jkl == 'l') return 'ayah';
		return 'ibu';
	}

	private tautanOrtu(data: ISlAnggota): string {
		let hasil: string = '';
		let ada: boolean = false;
		// let ayah: string = '';

		hasil += `<h3>Silsilah terkait:</h3>`;

		//ayah
		if (data.ortu[0]) {
			hasil += this.renderTautan(data.ortu[0], `${data.ortu[0].nama} (${this.ayahIbu(data.ortu[0])} dari ${data.nama})`);
			ada = true;
		}

		//ibu
		if (data.ortu[1]) {
			hasil += this.renderTautan(data.ortu[1], `${data.ortu[1].nama} (${this.ayahIbu(data.ortu[1])} dari ${data.nama})`);
			ada = true;
		}

		//pasangan
		if (data.pas && data.pas.ortu) {
			if (data.pas.ortu[0]) {
				hasil += this.renderTautan(data.pas.ortu[0], `${data.pas.ortu[0].nama} (${this.ayahIbu(data.pas.ortu[0])} dari ${data.pas.nama})`);
				ada = true;
			}

			if (data.pas.ortu[1]) {
				hasil += this.renderTautan(data.pas.ortu[1], `${data.pas.ortu[1].nama} (${this.ayahIbu(data.pas.ortu[1])} dari ${data.pas.nama})`);
				ada = true;
			}
		}

		if (!ada) {
			hasil += '<div>Tidak ada data</div>'
		}

		return hasil;
	}

	private renderTautan(anggota: ISlAnggota, msg: string): string {
		return `<a href="${util.getUrl(RouterKOns.berandaId, [anggota.id])}"> ${msg} </a><br/>`;
	}
}
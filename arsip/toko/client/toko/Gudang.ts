import { dialog } from "../comp/Dialog.js";
import { ITombol, MenuPopup } from "../comp/MenuPopUp.js";
import { Util } from "../comp/Util.js";
import { Router } from "./Router.js";

class Gudang {
	private menu: MenuPopup = new MenuPopup();
	private tombolAr: ITombol[] = [];

	constructor() {
		this.tombolAr = [
			{
				label: 'lihat lapak',
				f: () => {
					window.location.href = Util.getUrl(Router.toko_web_lapak_id, [this.id]);
				}
			},
			{
				label: '&#xf232; share',
				f: () => {
					window.location.href = Util.kirimWa(this.host + Util.getUrl(Router.toko_web_lapak_id, [this.id]));
				}
			},
		];

		//TODO: tombol diganti berdasarkan lapak status aktif
		if (this.aktif) {
			this.tombolAr.push(
				{
					label: 'nonaktifkan',
					f: () => {
						let data = {
							id: this.id,
							aktif: 0
						}

						let dataStr = JSON.stringify(data);

						Util.Ajax('post', Router.toko_gudang_profile_aktif_edit, dataStr).then((x: XMLHttpRequest) => {
							if (200 == x.status) {
								dialog.tampil('Lapak sudah di non aktifkan');
								dialog.okTbl.onclick = (e: MouseEvent) => {
									e.stopPropagation();
									window.location.reload();
								}
							}
							else {
								throw Error(x.responseText);
							}
						}).catch((e) => {
							Util.error(e);
						});
					}
				}

			)
		}
		else {
			this.tombolAr.push(
				{
					label: 'aktifkan',
					f: () => {
						let data = {
							id: this.id,
							aktif: 1
						}

						let dataStr = JSON.stringify(data);

						Util.Ajax('post', Router.toko_gudang_profile_aktif_edit, dataStr).then((x: XMLHttpRequest) => {
							if (200 == x.status) {
								dialog.tampil('Lapak sudah di aktifkan')
								dialog.okTbl.onclick = (e: MouseEvent) => {
									e.stopPropagation();
									window.location.reload();
								}
							}
							else {
								throw Error(x.responseText);
							}
						}).catch((e) => {
							Util.error(e);
						});
					}
				}

			)
		}

		this.tombolMenu.onclick = () => {
			console.log('tombol menu click');
			this.menu.tampil(this.tombolAr);
		}
	}

	get tombolMenu(): HTMLLinkElement {
		return document.body.querySelector('a.popup-menu') as HTMLLinkElement;
	}

	get id(): string {
		return document.body.getAttribute('data-id');
	}

	get aktif(): number {
		let aktif: number = parseInt(document.body.getAttribute('data-aktif'));
		console.debug('element: ' + document.body.getAttribute('data-aktif'));
		console.debug('aktif ' + aktif);
		return aktif;
	}

	get host(): string {
		return document.body.getAttribute('data-host');
	}
}

new Gudang();
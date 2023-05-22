import express from "express";
import fs from "fs";
import { RouterKons } from "./admin/RouterKons";

export class Util {
	private caches: ICache[] = [];
	private _randId: string = '';
	private _baseDir: string = '';
	static readonly revisi: string = '202212';

	getUrl(url: string, params: any[]): string {
		let urlHasil: string = url;

		params.forEach((item: string) => {
			urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
		});

		return urlHasil;
	}

	//TODO: [rev] param
	hal2(offsetLog: number, jumlahAbs: number, kunci: string, path: string, jmlPerHal: number, anggota: ISlAnggota): string {
		return `
			<nav aria-label="Page navigation example" style="text-align:center">
				${this.hal3(offsetLog, jumlahAbs, kunci, path, jmlPerHal, anggota)}
			</nav>
		`;
	}

	private hal3(offsetLog: number, jumlahAbs: number, kunci: string, path: string, jmlPerHal: number, anggota: ISlAnggota): string {
		let hasil: string = '';

		if (jumlahAbs <= jmlPerHal) {
			return '';
		}

		let jumlahLog: number = Math.ceil(jumlahAbs / jmlPerHal);

		let halSeb: number;
		let halSet: number;

		if (jumlahAbs <= 0) {
			return hasil;
		}

		halSeb = offsetLog - 1;
		if (halSeb < 0) halSeb = 0;

		halSet = offsetLog + 1;
		if (halSet > jumlahLog - 1) halSet = jumlahLog - 1;

		hasil = `
			<ul class="pagination">
				<li class="page-item">
					<a class="page-link" href="${this.getUrlCari(kunci, halSeb, path, anggota)}" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li class="page-item"><a class="page-link" href="#">${offsetLog + 1}/${jumlahLog}</a></li>
				<li class="page-item">
					<a class="page-link" href="${this.getUrlCari(kunci, halSet, path, anggota)}" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>		
		`;

		return hasil;
	}

	getUrlCari(kunci: string, hal: number, path: string, anggota: ISlAnggota): string {
		let hasil: string;

		//beranda
		if (path == RouterKons.daftarAnggotaFilter) {
			hasil = this.getUrl(path, [kunci, hal])
		}
		else if (path == RouterKons.halCariPasanganFilter) {
			hasil = this.getUrl(path, [anggota.id, kunci, hal])
		}
		else if (path == RouterKons.daftarCalonAnakFilter) {
			hasil = this.getUrl(path, [anggota.id, kunci, hal]);
		}
		else {
			throw Error('path belum didefinisikan');
		}

		return hasil;
	}

	stringNull(t: string): string {
		if (!t) return '---';
		if ('' == t) return '---';

		return t;
	}

	stringHrefNull(t: string): string {
		if (!t) return '#';
		if ('' == t) return '#';

		return t
	}

	renderValue(t: string): string {
		if (!t) return '---';
		if ("" == t) return '---';

		return t;
	}

	dateTimeStamp(t: string): string {
		// console.log('date time stamp, input: ' + t);

		if (!t) return '---';
		if ('' == t) return '---';

		t = t + '';

		let date: Date = new Date(t);

		if (!date) return '---';
		if ('Invalid Date' == (date + '')) return '---';

		let dateStr: string = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

		// console.log('date time stamp, hasil: ' + dateStr);
		return dateStr;
	}

	buatDateSekarang(): string {
		let date: Date = new Date();

		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}

	buatDateLama(): string {
		let date: Date = new Date(1900, 1, 1);
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}

	arr2String(ar: string[]): string {
		let hasil: string = ' ';

		ar.forEach((item: string, idx: number) => {
			if (0 === idx) {
				hasil += item;
			}
			else {
				hasil += " ," + item;
			}
		})

		hasil += ' ';

		return hasil;
	}

	buatRandom(): void {
		this._randId = '';
		for (let i: number = 0; i < 10; i++) {
			this._randId += (Math.floor(Math.random() * 10) + '');
		}
	}

	renderSpasiEnter(str: string): string {
		str = str.replace(/(?:\r\n|\r\|\n)/g, "<br/>");
		str = str.replace(/  /g, "&nbsp;&nbsp;");
		return str;
	}

	private ambilDariCache(url: string): string {
		let hasil: string = '';

		this.caches.forEach((item: ICache) => {
			if (item.url === url) {
				hasil = item.string;
			}
		})

		return hasil;
	}

	hapusCache(): void {
		this.caches = [];
	}

	async getFileNoCache(file: string): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.readFile(file, (err: NodeJS.ErrnoException, content) => {
				if (err) {
					reject(err);
				}
				else {
					resolve(content.toString());
				}
			})
		});
	}

	respError(resp: express.Response, e: Error) {
		console.debug("==================================================")
		console.error(e);
		console.debug("==================================================")
		resp.status(500).send(e.message);
	}


	async getFile(file: string): Promise<string> {
		return new Promise((resolve, reject) => {
			let cache: string;

			cache = this.ambilDariCache(file);


			if (cache != '') {
				cache = cache.replace('{{revisi}}', Util.revisi);
				resolve(cache);
			}

			fs.readFile(file, (err: NodeJS.ErrnoException, content) => {
				if (err) {
					reject(err);
				}
				else {
					this.caches.push({
						url: file,
						string: content.toString()
					})
					resolve(content.toString().replace('{{revisi}}', Util.revisi));
				}
			})

		});
	}

	async tulisKeFile(path: string, data: string): Promise<void> {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, (err) => {
				if (err) {
					reject(err);
				}
				else {
					resolve();
				}
			})
		});
	}

	buatWa(wa: string, namaBarang: string): string {
		return 'https://wa.me/' + wa + "?text==========%0D%0A" + namaBarang + "%0D%0A=========%0D%0AAssalamu'alaikum:";
	}

	public get randId(): string {
		return this._randId;
	}

	public get baseDir(): string {
		return this._baseDir;
	}

	public set baseDir(value: string) {
		this._baseDir = value;
	}

}

export var util: Util = new Util();

interface ICache {
	url: string,
	string: string
}
import { dialog } from "../comp/Dialog.js";
import { loading } from "../comp/Loading.js";

//TODO:hapus
class Util {

	static readonly sUserId: string = 'user_id';
	static readonly sLevel: string = 'level';
	static readonly sFilter: string = 'filter';
	static readonly storageId: string = 'xyz.hagarden.tugas';

	static getEl(query: string, parent: HTMLElement = null, err: boolean = true): HTMLElement {
		let el: HTMLElement;
		if (!parent) parent = document.body;

		el = parent.querySelector(query);

		if (el) {
			return el
		} else {
			console.log(parent);
			console.log(query);
			if (err) {
				throw new Error('query not found ');
			}
			else {
				return null;
			}
		}
	}

	static async Ajax(type: string, url: string, dataStr: string, pf: (p: ProgressEvent) => void = null): Promise<XMLHttpRequest> {
		console.log('ajax');
		return new Promise((resolve: any, reject: any) => {
			try {
				console.group('send data');
				console.log(dataStr);
				console.log("type " + type);

				loading.attach(document.body);

				let xhr: XMLHttpRequest = new XMLHttpRequest();


				xhr.onload = () => {
					loading.detach();
					resolve(xhr);
				};

				xhr.onerror = (e: any) => {
					console.log('xhr error');
					console.log(e);
					loading.detach();
					reject(new Error(e.message));
				}

				xhr.onprogress = (p: ProgressEvent) => {
					if (pf) {
						pf(p);
					}
				}

				xhr.open(type, url + "", true);
				xhr.setRequestHeader('Content-type', 'application/json');
				xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
				xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));
				xhr.send(dataStr);

				// console.log("type " + type);
				// console.log("url " + url);
				console.groupEnd();
			}
			catch (e) {
				console.log('Util error');
				console.log(e);
				loading.detach();
				reject(new Error(e.message));
			}

		});
	}

	static error(e: Error): void {
		console.error(e);
		dialog.tampil(e.message);
	}

	static async sql(query: string,): Promise<any[]> {
		console.log('sql');
		let hasil: XMLHttpRequest = await this.Ajax("post", "http://localhost:3000/api/", JSON.stringify({ api: query }));

		if (hasil.status == 200) {
			return JSON.parse(hasil.responseText);
		}
		else {
			throw Error(hasil.responseText);
		}

	}

}

Util;
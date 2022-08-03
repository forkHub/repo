namespace ha.comp {
	export class Util {

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


		//default error
		static error(e: Error): void {
			console.error(e);
			dialog.tampil(e.message);
		}

		//shared
		static kirimWa(teks: string): string {
			return "whatsapp://send?text=" + teks;
		}

		static getUrl(url: string, params: any[]): string {
			let urlHasil: string = url;

			console.group('get url');
			console.log('url: ' + url);
			console.log('params: ' + JSON.stringify(params));

			params.forEach((item: string) => {
				console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
				urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
				console.log('item: ' + item);
				console.log('url: ' + urlHasil);
			});

			console.log('url hasil: ' + urlHasil);
			console.groupEnd();

			return urlHasil;
		}

		static async AjaxLogin(type: string, urlServer: string, dataStr: string, loginUrl: string, pf: (p: ProgressEvent) => void = null): Promise<XMLHttpRequest> {
			let xml: XMLHttpRequest;

			xml = await this.Ajax(type, urlServer, dataStr, pf);
			if (401 == xml.status) {
				window.top.location.href = loginUrl
				return null;
			}
			else {
				return xml;
			}
		}

		static async Ajax2(type: string, url: string, dataStr: string, pf: (p: ProgressEvent) => void = null): Promise<string> {

			let x: XMLHttpRequest = await this.Ajax(type, url, dataStr, pf);
			if (x.status == 200 || x.status == 0) {
				return x.responseText;
			}
			console.log('error status code: ' + x.status);

			throw Error(x.responseText);
		}

		static async Ajax(type: string, url: string, dataStr: string, pf: (p: ProgressEvent) => void = null): Promise<XMLHttpRequest> {
			return new Promise((resolve: any, reject: any) => {
				try {
					console.group('send data');
					// console.log(dataStr);
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

					// xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
					// xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));

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

	}
}


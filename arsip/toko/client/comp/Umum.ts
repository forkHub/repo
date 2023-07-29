import { dialog } from "./Dialog.js";
import { Param } from "./Param.js";
import { Util } from "./Util.js";

declare var md5: Function;
declare var tinyMCE: any;

class Umum {

	private formCariHandler(form: HTMLFormElement): void {
		form.onsubmit = () => {
			try {
				console.log('form on submit get');

				let formData: FormData = new FormData(form);
				let query: string = '';

				for (let item of formData.entries()) {
					if (item[0] == "cari") {
						query = window.encodeURI(item[1].toString());
					}
				}

				// console.debug(form.action);
				// console.debug(query);
				// console.debug('');

				let url: string = Util.getUrl(form.getAttribute("action_url"), [query, 0]);

				// console.debug("url:");
				// console.debug(url);

				window.location.href = url;
			}
			catch (e) {
				Util.error(e);
			}

			return false;
		}
	}

	private formPostJSONHandler(form: HTMLFormElement): void {
		form.onsubmit = () => {
			console.log('form on submit');

			try {
				console.log('form on submit, action= ' + form.action);

				let formData = this.formPopulate(form);

				console.log(form.action);

				Util.Ajax("post", form.action, JSON.stringify(formData)).then((xml: XMLHttpRequest) => {
					console.log('xml finish, status ' + xml.status);
					// console.log('aj-url ' + form.getAttribute('aj-url'));

					if (xml.status >= 200 && (xml.status <= 300)) {
						console.debug('ajax sukses');
						console.debug(xml.responseText);

						if (form.hasAttribute(Param.HA_DLG)) {
							dialog.tampil(form.getAttribute(Param.HA_DLG));
							dialog.okTbl.onclick = () => {
								if (form.hasAttribute(Param.HA_URL)) {
									window.top.location.href = form.getAttribute(Param.HA_URL);
								}
							}
						}
						else if (form.hasAttribute(Param.HA_URL)) {
							window.top.location.href = form.getAttribute(Param.HA_URL);
						}
					}
					else {
						throw Error(xml.responseText);
					}
				}).catch((e) => {
					Util.error(e);
				})
			}
			catch (e) {
				Util.error(e);
			}

			console.debug('form end');
			return false;
		}
	}

	private formPopulate(form: HTMLFormElement): any {
		let hasil: any = {};

		let input: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
		let textArea: NodeListOf<HTMLTextAreaElement> = form.querySelectorAll('textarea');
		let select: NodeListOf<HTMLSelectElement> = form.querySelectorAll('select');

		input.forEach((item: HTMLInputElement) => {
			let value: string = '';

			if (item.hasAttribute(Param.HA_MD5)) {
				value = md5(item.value);
			}
			else if (item.hasAttribute(Param.HA_TINYMCE)) {
				value = tinyMCE.editors[0].getContent();
				console.debug('tinymce get content:');
				console.debug(tinyMCE.editors[0].getContent());
			}
			else {
				value = item.value;
			}

			// console.debug(item);
			// console.debug(item.value);

			hasil[item.name] = value;
		})

		// console.debug('populate form:');
		// console.debug(hasil);

		textArea.forEach((item: HTMLTextAreaElement) => {
			//TODO: validation, tinymce
			if (item.hasAttribute(Param.HA_TINYMCE)) {
				hasil[item.name] = tinyMCE.editors[0].getContent();
			} else {
				hasil[item.name] = item.value;
			}
		})

		select.forEach((item: HTMLSelectElement) => {
			hasil[item.name] = item.value
		})

		return hasil;
	}

	form(): void {
		console.log('json submit');

		let formAr: NodeListOf<HTMLFormElement> = document.body.querySelectorAll('form');

		formAr.forEach((form: HTMLFormElement) => {
			console.debug(form);
			if (form.hasAttribute(Param.HA_MANUAL)) {
				return;
			}

			if (form.method.toLowerCase() == 'post') {
				this.formPostJSONHandler(form);
			}
			else if (form.method.toLowerCase() == 'get') {
				console.log('form get');
				console.log(form);

				//TOOD: param
				if (form.getAttribute('type') == "cari") {
					console.log('form type');
					console.log(form);

					this.formCariHandler(form);
				}
				else {
					console.error('belum diimplementasikan');
				}
			}

		});
	}

	private ajaxKlik(el: HTMLElement): void {
		if (el.hasAttribute(Param.HA_POST)) {
			Util.Ajax('post', el.getAttribute(Param.HA_POST), '', null).then((xml: XMLHttpRequest) => {
				if (xml.status >= 200 && xml.status < 300) {
					if (el.getAttribute(Param.HA_RELOAD)) {
						window.location.reload();
					}
					else if (el.hasAttribute(Param.HA_DLG)) {
						dialog.tampil(el.getAttribute(Param.HA_DLG));
						dialog.okTbl.onclick = () => {
							if (el.hasAttribute(Param.HA_RELOAD)) {
								window.location.reload();
							}
							else if (el.hasAttribute(Param.HA_URL)) {
								window.location.href = el.getAttribute(Param.HA_URL);
							}
						}
					}
					else if (el.hasAttribute(Param.HA_URL)) {
						window.location.href = el.getAttribute(Param.HA_URL);
					}
				}
				else {
					dialog.tampil(xml.responseText);
				}
			}).catch((e) => {
				Util.error(e);
			});
		}
		else if (el.hasAttribute(Param.HA_GET)) {
			window.location.href = el.getAttribute(Param.HA_GET);
		}
		else {
			//errror
			console.error(el);
			throw Error('method tidak definisikan post/get');
		}

	}

	klik(): void {
		let el: NodeListOf<Element> = document.body.querySelectorAll(`[${Param.HA_KLIK}]`);
		console.log('klik element:');
		console.log(el);

		el.forEach((el2: Element) => {
			(el2 as HTMLElement).onclick = (e) => {
				e.stopPropagation();
				e.preventDefault();

				if (el2.hasAttribute(Param.HA_KF)) {
					let ok: boolean = confirm(el2.getAttribute(Param.HA_KF))
					if (ok) {
						this.ajaxKlik(el2 as HTMLElement);
					}
				}
				else if (el2.hasAttribute(Param.HA_DLG)) {
					dialog.tampil(el2.getAttribute(Param.HA_DLG));
					dialog.okTbl.onclick = () => {
						if (el2.hasAttribute(Param.HA_RELOAD)) {
							window.location.reload();
						}
						else {
							this.ajaxKlik(el2 as HTMLElement);
						}
					}
				}
				else if (el2.hasAttribute(Param.HA_TOGGLE)) {
					let sel: string = el2.getAttribute(Param.HA_TOGGLE);
					let el3: HTMLElement = document.body.querySelector(sel);

					el3.classList.toggle('disp-none');
					el3.classList.toggle('disp-block');

				}
				else {
					this.ajaxKlik(el2 as HTMLElement);
				}
			}
		})
	}

	tiny(): void {
		let el: NodeListOf<Element> = document.body.querySelectorAll(`textarea[${Param.HA_TINYMCE}]`);
		let el2: Element = el[0];

		console.log(el);
		console.log(el2);

		if (!el2) return;

		console.debug('tiny mce init');
		console.debug(tinyMCE.init);

		tinyMCE.init({
			setup: (ed: any) => {
				ed.on('init', (_args: any) => {
					console.debug('tinymce on loaded');
					// this.init();
				});

				// ed.on('init', () => {
				// 	this.updateStatusTombolSimpan();
				// });
			},
			selector: `textarea[${Param.HA_TINYMCE}]`
		});
	}
}

var umum: Umum = new Umum();
umum.form();
umum.klik();
umum.tiny();

// umum.buttonAction();
// umum.buttonToggle();
// umum.klik();

	// buttonToggleEvt(i: number): void {
	// 	let el: HTMLElement = document.body.querySelector('toggle-src-' + i);


	// 	if (el) {
	// 		el.onclick = (e: MouseEvent) => {
	// 			e.stopPropagation();
	// 			e.preventDefault();

	// 			let target: HTMLElement = document.body.querySelector('toggle-target-' + i);
	// 			if (target) {
	// 				if (target.style.display == 'block') {
	// 					target.style.display = 'none';
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// buttonToggle(): void {
	// 	for (let i: number = 0; i < 9; i++) {
	// 		this.buttonToggleEvt(i);

	// 	}

	// 	let buttonAr: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll('toggle toggle-src ');

	// 	console.log("button toggle: ")
	// 	console.log(buttonAr);

	// 	buttonAr.forEach((button: HTMLButtonElement) => {
	// 		button.onclick = (e: MouseEvent) => {
	// 			e.preventDefault();
	// 			e.stopPropagation();

	// 			let index: string = button.getAttribute('toggle-idx');
	// 			let el: HTMLElement = document.body.querySelector(`[toggle-target][toggle-idx="${index}"`);

	// 			console.log('index ' + index);
	// 			console.log('el: ');
	// 			console.log(el);

	// 			if (el) {
	// 				if (el.style.display = 'block') {
	// 					el.style.display = 'none';
	// 				}
	// 				else {
	// 					el.style.display = 'block';
	// 				}
	// 			}
	// 		}
	// 	})
	// }

	// private ajax(el: HTMLElement): void {
	// 	if (el.hasAttribute('aj-post')) {
	// 		Util.Ajax('pos', el.getAttribute('aj-url'), '', null).then((xml: XMLHttpRequest) => {
	// 			if (xml.status >= 200 && xml.status < 300) {
	// 				if (el.getAttribute('on-post-reload')) {
	// 					window.location.reload();
	// 				}
	// 				else if (el.hasAttribute('on-post-dlg')) {
	// 					dialog.tampil(el.getAttribute('on-post-dlg'));
	// 					dialog.okTbl.onclick = () => {
	// 						if (el.hasAttribute('on-post-reload')) {
	// 							window.location.reload();
	// 						}
	// 					}
	// 				}
	// 			}
	// 			else {
	// 				dialog.tampil(xml.responseText);
	// 			}
	// 		}).catch((e) => {
	// 			Util.error(e);
	// 		});
	// 	}
	// 	else if (el.hasAttribute('aj-get')) {
	// 		window.location.href = el.getAttribute('aj-url');
	// 	}
	// 	else {
	// 		//errror
	// 		console.error(el);
	// 		throw Error('');
	// 	}

	// }

	// klik(): void {
	// 	let el: NodeListOf<Element> = document.body.querySelectorAll("[pc-klik]");
	// 	console.log('klik element:');
	// 	console.log(el);

	// 	el.forEach((el2: Element) => {
	// 		(el2 as HTMLElement).onclick = (e) => {
	// 			e.stopPropagation();
	// 			e.preventDefault();

	// 			if (el2.hasAttribute('kf-teks')) {
	// 				let ok: boolean = confirm(el2.getAttribute('kf-teks'))
	// 				if (ok) {
	// 					this.ajax(el2 as HTMLElement);
	// 				}
	// 			}
	// 			else if (el2.hasAttribute('dlg-teks')) {
	// 				dialog.tampil(el2.getAttribute('dlg-teks'));
	// 				dialog.okTbl.onclick = () => {
	// 					this.ajax(el2 as HTMLElement);
	// 				}
	// 			}
	// 			else {
	// 				this.ajax(el2 as HTMLElement);
	// 			}
	// 		}
	// 	})
	// }


	// buttonSubmitter(): void {
	// 	let buttonAr: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll('button[type="form-submit"]');
	// 	buttonAr.forEach((button: HTMLButtonElement) => {
	// 		button.onclick = (e: MouseEvent) => {
	// 			e.stopPropagation();
	// 			e.preventDefault();
	// 			//TODO:
	// 		}
	// 	});
	// }

	// buttonAction(): void {
	// 	let buttonAr: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll('button[type="button"][action]');

	// 	console.log("button action: ")
	// 	console.log(buttonAr);

	// 	buttonAr.forEach((button: HTMLButtonElement) => {
	// 		button.onclick = (e: MouseEvent) => {
	// 			e.preventDefault();
	// 			e.stopPropagation();

	// 			window.location.href = button.getAttribute('action');
	// 		}
	// 	})

	// }

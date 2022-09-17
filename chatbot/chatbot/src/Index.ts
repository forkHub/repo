class Chat {
	private static _chatAktif: IChat;

	static getByLabel(label: string): IChat {
		let hasil: IChat;

		data.forEach((item: IChat) => {
			if (item.label == label) {
				hasil = item;
			}
		})

		return hasil;
	}

	static renderText(str: string, cont: HTMLElement, jawab: boolean = false): HTMLElement {
		let div: HTMLElement;
		let divCont: HTMLElement;

		divCont = document.createElement('div');
		divCont.classList.add('padding');

		div = document.createElement('div');
		div.classList.add('chat-bot');
		div.classList.add('padding');
		div.classList.add('inline-block');
		div.innerHTML = str;

		divCont.appendChild(div);

		if (jawab) {
			divCont.classList.add('jawab');
			divCont.classList.add('text-align-right');
			// div.classList.add('text-align-left');
		}

		cont.appendChild(divCont);
		return divCont;
	}

	static renderMenu(menu: IMenu): HTMLElement {
		let hasil: HTMLElement;

		hasil = document.createElement('div');

		let tbl: HTMLButtonElement;

		tbl = document.createElement('button');
		tbl.classList.add('padding');
		tbl.classList.add('inline-block');
		tbl.style.marginBottom = '4px';
		tbl.innerHTML = menu.judul;
		tbl.onclick = async (e: MouseEvent): Promise<void> => {
			e.stopPropagation();

			jawabTxt.value = menu.judul;
			chatCont.scrollTop = chatCont.scrollHeight;
			await ha.comp.Util.delay(500);
			await this.kirim(menu.judul);

			jawabTxt.value = '';
			chatCont.scrollTop = chatCont.scrollHeight;
		}

		hasil.appendChild(tbl);

		return hasil;
	}

	static render(data: IChat, jawab: boolean = false): void {
		let div: HTMLElement = this.renderText(data.isi, chatCont, jawab);
		let menuEl: HTMLElement = div.querySelector('div.chat-bot');

		if (data.menu) {
			data.menu.forEach((item: IMenu) => {
				//render menu
				menuEl.appendChild(this.renderMenu(item));

				//padding
			})
		}
	}

	static mirip(test: string, teks: string): boolean {
		test = test.toLowerCase();
		teks = teks.toLowerCase();

		test = test.trim().toLowerCase();
		teks = teks.trim().toLowerCase();

		if (test == teks) return true;

		// if (test.includes(teks)) return true;

		// if (teks.includes(test)) return true;

		//75%

		return false;
	}

	static async getGoto(teks: string): Promise<string[]> {
		let hasil: string[] = [];

		console.group('get goto');
		console.debug('teks: ' + teks)

		//check default
		if (this._chatAktif.gotoDef) {
			console.log('ada di def');
			console.log(this._chatAktif);
			hasil = this._chatAktif.gotoDef;
		}

		//check ada di response
		if (this.chatAktif.menu) {
			this._chatAktif.menu.forEach((item: IMenu) => {
				if (this.mirip(item.judul, teks)) {
					hasil = item.goto;
					console.log('ada di menu');
					console.log(hasil);
					console.log(item.goto);
				}
			})

		}

		//check ada di menu
		if (this._chatAktif.resp) {
			this._chatAktif.resp.forEach((item: IMenu) => {
				if (this.mirip(item.judul, teks)) {
					console.log('ada di resp');
					hasil = item.goto;
				}
			})
		}

		console.debug('hasil:');
		console.debug(hasil);

		console.groupEnd();

		chatCont.scrollTop = chatCont.scrollHeight;
		await ha.comp.Util.delay(500);

		return hasil;
	}

	static async kirim(teks: string = ''): Promise<void> {
		teks = teks.trim();
		if (teks.length == 0) return;

		this.renderText(teks, chatCont, true);

		let goto: string[] = await this.getGoto(teks);

		if (goto.length == 0) {
			let chat: IChat = this._chatAktif;
			// chat = this.getByLabel(item);
			this.render(chat);
			return;
		}

		goto.forEach((item: string) => {
			let chat: IChat;
			chat = this.getByLabel(item);
			this._chatAktif = chat;
			this.render(chat);
		});


	}

	public static get chatAktif(): IChat {
		return Chat._chatAktif;
	}

	public static set chatAktif(value: IChat) {
		Chat._chatAktif = value;
	}

}

const chatCont: HTMLElement = ha.comp.Util.getEl('div.chat-cont');
const kirimTbl: HTMLButtonElement = ha.comp.Util.getEl('button.kirim') as HTMLButtonElement;
const jawabTxt: HTMLInputElement = ha.comp.Util.getEl('input.jawab') as HTMLInputElement;
const formBalas: HTMLFormElement = ha.comp.Util.getEl('form.balas') as HTMLFormElement;

Chat.chatAktif = data[0];
Chat.render(data[0]);
// Chat.render(data[1]);

formBalas.onsubmit = async (e: Event): Promise<void> => {
	e.stopPropagation();
	e.preventDefault();

	await Chat.kirim(jawabTxt.value);
	jawabTxt.value = '';
	chatCont.scrollTop = chatCont.scrollHeight;
}
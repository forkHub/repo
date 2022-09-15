class Chat {

	static render(data: IChat, cont: HTMLElement): void {
		let div: HTMLElement;

		div = document.createElement('div');
		div.classList.add('chat-bot');
		div.innerHTML = data.isi;

		cont.appendChild(div);
	}

}

const chatCont: HTMLElement = ha.comp.Util.getEl('chat-cont');
Chat.render(data[0], chatCont);

class Edit2 {
	private editArea: HTMLTextAreaElement = document.querySelector('form textarea');
	private iframe: HTMLIFrameElement = document.querySelector('iframe');
	private hal2: string;
	private tebel: HTMLButtonElement = document.querySelector('button#tebel') as HTMLButtonElement;

	init(): void {
		this.editArea.oninput = () => {
			this.hal2 = this.editArea.value;
			this.compile();
		}

		this.tebel.onclick = () => {
			let sel: Selection = window.getSelection();
			if (sel.type == 'Range') {
				console.log(this.editArea.selectionStart + '/' + this.editArea.selectionEnd);
				let kiri: string = this.editArea.value.slice(0, this.editArea.selectionStart);
				let tengah: string = this.editArea.value.slice(this.editArea.selectionStart, this.editArea.selectionEnd);
				let kanan: string = this.editArea.value.slice(this.editArea.selectionEnd);

				console.log(kiri);
				console.log(tengah);
				console.log(kanan);

				this.editArea.value = kiri + "<b>" + tengah + "</b>" + kanan;
			}
		}
	}

	compile(): void {
		this.hal2 = this.hal2.replaceAll('\n', '<br/>');

		setTimeout(() => {
			this.iframe.contentWindow.document.open();
			this.iframe.contentWindow.document.write(this.hal2);
			this.iframe.contentWindow.document.close();
		}, 0);
	}

}

window.onload = () => {
	let edit: Edit2 = new Edit2();
	edit.init();
}
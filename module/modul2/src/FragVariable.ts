class FragVariable {
	static readonly cont: HTMLElement = ha.comp.Util.getEl('div.variable div.daftar');
	private static dipilih: HTMLElement;

	static load(): void {
		this.cont.innerHTML = '';

		let modul: IModul = Modul.getId(Kontek.modulId);

		Variable.daftar.forEach((item: IVariable) => {

			if (modul.variable.indexOf(item.id) >= 0) {
				let view: HTMLElement = this.buatView(item);
				this.cont.appendChild(view);
			}

		});

	}

	static tombolTambahKlik() {
		let judul: string = window.prompt('nama variable');

		let variable: IVariable = Variable.buat(judul);
		let view: HTMLElement = this.buatView(variable);
		this.cont.appendChild(view);

		let modulId: number = Kontek.modulId;
		let modul: IModul = Modul.getId(modulId);

		modul.variable.push(variable.id);

		Data.simpan();
	}

	static itemKlik(el: HTMLElement): void {
		console.log(el);

		if (this.dipilih) {
			this.dipilih.classList.remove('dipilih');
		}

		this.dipilih = el;
		this.dipilih.classList.add('dipilih');
	}

	static buatView(item: IVariable): HTMLElement {
		let view: HTMLElement;

		view = ha.comp.Util.getTemplate('div.item');
		view.setAttribute('id', item.id + '');
		view.setAttribute('type', VARIABLE);
		ha.comp.Util.getEl('span.nama', view).innerHTML = item.judul;

		view.onclick = () => {
			FragVariable.itemKlik(view);
		}

		return view;
	}
}
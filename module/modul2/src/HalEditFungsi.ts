class HalEditFungsi {
	private el: HTMLElement;

	async tampil(): Promise<void> {
		if (!this.el) {
			this.el = ha.comp.Util.createEl(await ha.comp.File.load('./data/hal-edit-fungsi.html'));
		}

		document.body.appendChild(this.el);

		//render param
		Fungsi.getDipilih().param.forEach((id: number) => {
			id; //TODO:
		})

		//render variable
		Fungsi.getDipilih().variable.forEach((id: number) => {
			id; //TODO:
		});

		//render statement
		Fungsi.getDipilih().stmt.forEach((
			id: number) => {
			id; //TODO:
		})
	}
}
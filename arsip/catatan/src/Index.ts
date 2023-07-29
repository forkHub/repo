window.onload = () => {
	HalDepan.inst.attach(document.body);
	load();
}

function simpan(): void {
	window.localStorage.setItem('ha.note.data', JSON.stringify(Note.slice()));
}

function load(): void {
	Note.hapusSemua();
	NoteItem.hapusSemua();

	try {
		let str: string;
		str = window.localStorage.getItem('ha.note.data');
		if (str) {
			let note: INote[] = JSON.parse(str);

			note.forEach((item: INote) => {
				Note.push(item);
				NoteItem.buat(item).attach(HalDepan.inst.listCont);
			});
		}
		else {
			console.log('data belum ada');
		}
	}
	catch (e) {
		console.error(e);
		ha.comp.dialog.tampil('Ada kesalahan');
	}

	HalDepan.inst.updateKosong();

}

interface INote {
	id: number,
	tgl: number,
	judul: string,
	isi: string
}
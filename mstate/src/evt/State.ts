///<reference path="../OnCreate.ts"/>

State.onChange = () => {
	console.log('state on change: ' + State.aktif);

	let nama: string = State.aktif;
	tombolCont.innerHTML = '';

	//render history
	stateCont.innerHTML = State.getHistory();

	if (nama == State.IDLE) {

		tbhTombol(Tombol.DOT);
		tbhTombol(Tombol.POLIGON);

		//ada dot
		if (Dot.jml > 0 || (Poligon.jml > 0)) {
			tbhTombol(Tombol.PILIH);
		}

		//ada yang dipilih
		if (Dot.dipilih > 0) {
			tbhTombol(Tombol.GESER);
			tbhTombol(Tombol.SKALA);
			tbhTombol(Tombol.PUTAR);
		}

		tbhTombol(Tombol.DEBUG);
	}
	else if (nama == State.PILIH) {
		tbhTombol(Tombol.OK);
		tbhTombol(Tombol.BATAL);
	}
	else if (nama == State.DIPILIH) {
		tbhTombol(Tombol.GESER);
		tbhTombol(Tombol.PIVOT);
		tbhTombol(Tombol.OK);
	}
	else if (nama == State.GESER) {
		tbhTombol(Tombol.OK);
	}
	else if (nama == State.SKALA) {
		tbhTombol(Tombol.OK);
	}
	else if (nama == State.PUTAR) {
		tbhTombol(Tombol.OK);
	}
	else if (nama == State.PILIH_PIVOT) {
		tbhTombol(Tombol.OK);
	}
	else {
		throw Error('state error: ' + nama);
	}

	function tbhTombol(nama: string): void {
		tombolCont.appendChild(Tombol.getById(nama).view);
	}
}


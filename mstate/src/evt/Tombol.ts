///<reference path="../OnCreate.ts"/>

//FILE: TOMBOL.TS
Tombol.getById(Tombol.DOT).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();
	Dot.buat(100, 100, 0);
}

Tombol.getById(Tombol.POLIGON).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();
	Poligon.buatKotak(100, 100);
}


Tombol.getById(Tombol.DEBUG).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();

	if (!Dot.dipilih) return;

	let dot: IDot = Dot.getById(Dot.dipilih);

	if (dot.indukId > 0) {
		// console.log('hapus pivot');
		Dot.hapusPivot(dot);
		// console.log(dot);
	}
	else {
		console.log('set pivot ' + dot.id + '/' + id1);
		Dot.setPivot(dot.id, id1);
		console.log(dot);
	}

	flRender = true;
}

Tombol.getById(Tombol.PILIH).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();
	if (Dot.jml == 0) {
		ha.comp.dialog.tampil('Tidak ada object');
	}
	else {
		console.log('pilih klik');
		Dot.resetDipilih();
		State.push(State.PILIH);
		flRender = false;
	}
}

Tombol.getById(Tombol.OK).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();

	if (isPop(State.aktif)) {
		State.pop();
	}
	else {
		throw Error('error: ' + State.aktif);
	}

	function isPop(name: string): boolean {
		if (name == State.GESER) return true;
		if (name == State.SKALA) return true;
		if (name == State.PUTAR) return true;
		if (name == State.PILIH) return true;

		return false;
	}
}

Tombol.getById(Tombol.GESER).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();

	//STATE GERAK
	State.push(State.GESER);
}

Tombol.getById(Tombol.PIVOT).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();

	State.push(State.PILIH_PIVOT);
}

Tombol.getById(Tombol.SKALA).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();

	State.push(State.SKALA);
}

Tombol.getById(Tombol.PUTAR).view.onclick = (e: MouseEvent) => {
	e.stopPropagation();
	State.push(State.PUTAR)
}
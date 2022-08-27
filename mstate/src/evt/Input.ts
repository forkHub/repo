///<reference path="../OnCreate.ts"/>

let mulaiX: number = 0;
let mulaiY: number = 0;
let skalaAwalX: number = 1;
let skalaAwalY: number = 1;
let rotasiAwal: number = 0;

Input.onStateChange = () => {
	// console.log(kanvas.Input.state);
}

Input.onDrag = () => {
	if (!Dot.dipilih) return;
	let dot: IDot = Dot.getById(Dot.dipilih);

	if (State.SKALA == State.aktif) {
		let dragx: number = (Input.mDragX / canvas.width);

		dot.skala.x = skalaAwalX + dragx;
		dot.skala.y = skalaAwalX + dragx;


		flRender = true;
	}
	else if (State.GESER == State.aktif) {
		dot.pos.x = mulaiX + Input.mDragX;
		dot.pos.y = mulaiY + Input.mDragY;

		flRender = true;
	}
	else if (State.PUTAR == State.aktif) {
		let drag: number = (Input.mDragX / canvas.width) * 45;
		dot.rotasi = rotasiAwal + drag;

		// let d2: IDot = Dot.getById(id2);
		// let d3: IDot = Dot.getById(id3);
		// let msg: string = 'd2: ' + d2.rotasiGlobal + '/d3: ' + d3.rotasiGlobal;

		// debug(msg);

		flRender = true;
	}

}

Input.onPencet = () => {
	if (!Dot.dipilih) return;

	let dot: IDot = Dot.getById(Dot.dipilih);

	mulaiX = dot.pos.x;
	mulaiY = dot.pos.y;

	skalaAwalX = dot.skala.x;
	skalaAwalY = dot.skala.y;
	rotasiAwal = dot.rotasi;

	// console.log('mulai x' + mulaiX + '/mulai y' + mulaiY);
}

Input.onTap = () => {
	if (State.PILIH == State.aktif) {
		let dot: number = Dot.collided(Input.clientX, Input.clientY);

		if (dot) {
			Dot.dipilih = dot;
		}
		else {
			Dot.resetDipilih();
		}

		flRender = true;
	}
	else if (State.PILIH_PIVOT == State.aktif) {
		let dot: number = Dot.collided(Input.clientX, Input.clientY);

		if (dot && Dot.dipilih != dot) {
			Dot.target = dot;
		}

		flRender = true;
	}
}

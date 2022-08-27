///<reference path="evt/Tombol.ts"/>
///<reference path="evt/Dot.ts"/>
///<reference path="evt/State.ts"/>
///<reference path="evt/Input.ts"/>

//flow
State.ganti(State.IDLE);
requestAnimationFrame(update);
// test();

//function
function debug(msg: string) {
	debugCont.innerHTML = msg;
}

function update() {
	if (flRender) {
		flRender = false;
		render();
	}

	requestAnimationFrame(update)
}

function render(): void {
	ctx.fillStyle = `rgba(255,255,255,1)`;
	ctx.fillRect(0, 0, 1000, 1000);

	Dot.daftar.forEach((item: IDot) => {
		Dot.render(item, ctx);
	});

	Poligon.slice().forEach((item: IPoligon) => {
		Poligon.render(item, ctx);
	})
}

function test() {
	id1 = Dot.buat(100, 100, 0);
	id2 = Dot.buat(100, 100, 0);
	id3 = Dot.buat(100, 100, 0);

	let dot2: IDot = Dot.getById(id2);
	let dot3: IDot = Dot.getById(id3);

	dot2.pos.x = 130;
	dot2.pos.y = 100;
	Dot.setPivot(dot2.id, id1);
	// dot2.indukId = id1;

	dot3.pos.x = 180;
	dot3.pos.y = 100;
	// dot3.indukId = id2;
	Dot.setPivot(dot3.id, id2);
}
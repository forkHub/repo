let canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

window.onload = () => {
	test();
	jump(10, 400, 110, 120, 210, 400, 30);
}

function jump(sx: number, sy: number, tx: number, ty: number, dx: number, dy: number, step: number): void {

	for (let i: number = 0; i <= step; i++) {
		let p2x: number;
		let t2x: number;
		let p2y: number;
		let t2y: number;

		t2y = tween(i / step, 2);
		p2y = sy - t2y * Math.abs(ty - sy);

		t2x = tween(i / step, 0);
		p2x = sx + t2x * Math.abs(tx - sx);
		ctx.fillRect(p2x, p2y, 2, 2);
	}

	for (let i: number = 0; i <= step; i++) {
		let p2x: number;
		let t2x: number;
		let p2y: number;
		let t2y: number;

		t2y = tween(i / step, 1);
		p2y = ty + t2y * Math.abs(ty - dy);

		t2x = tween(i / step, 0);
		p2x = tx + t2x * Math.abs(dx - tx);
		ctx.fillRect(p2x, p2y, 2, 2);
	}

}

function test(): void {
	let tmax: number = 20
	let s: number = 280

	for (let i: number = 0; i <= tmax; i++) {
		let px: number;
		let tx: number;

		//speeding up
		tx = tween(i / tmax, 1);
		px = 10 + tx * s;
		ctx.fillRect(px, 10, 2, 2);

		//slowing down
		tx = tween(i / tmax, 2)
		px = 10 + tx * s;
		ctx.fillRect(px, 40, 2, 2);

		//normal
		tx = tween(i / tmax, 0)
		px = 10 + tx * s;
		ctx.fillRect(px, 70, 2, 2);
	}
}

function tween(idx: number, mode: number): number {
	if ((idx < 0) || (idx > 1)) throw Error('idx should be 0 .. 1');

	if (0 == mode) {
		return idx;
	}
	else if (1 == mode) {
		return idx * idx
	}
	else if (2 == mode) {
		return idx * (2 - idx)
	}
	else {
		throw Error('invalid mode (0, 1, 2)');
	}

}
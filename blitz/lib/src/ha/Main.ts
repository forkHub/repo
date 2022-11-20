namespace ha {

	//TODO: beberapa perintah harus mengecheck apakah kanvas sudah di init, dan coba lagi kalau belum bisa
	export class Main {
		private static _fps: number = 0;
		private static _origin: IV2D;
		private static _canvasAr: IGambar[] = [];
		private static _canvasAktif: IGambar;
		private static _skalaOtomatis: boolean = true;

		static Fps(n: number) {
			ha.Main.fps = Math.floor(1000 / n);
			if (n >= 60) {
				ha.Main.fps = 0;
			}
		}

		static buatCanvas(canvasEl: HTMLCanvasElement): IGambar {
			let canvas: IGambar = {
				canvas: canvasEl,
				ctx: canvasEl.getContext('2d'),
				lebar: canvasEl.height,
				// scaleX: 1,
				// scaleY: 1,
				panjang: canvasEl.width,
				frameH: canvasEl.height,
				frameW: canvasEl.width,
				handleX: 0,
				handleY: 0,
				img: null,
				isAnim: false,
				rotation: 0,
				rect: ha.Rect.create(),
				load: true,
				panjangDiSet: true,
				lebarDiSet: true
			}

			return canvas;
		}

		static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void {
			let canvas: IGambar = this.buatCanvas(canvasBelakang);
			this._canvasAr.push(canvas);

			canvas = this.buatCanvas(canvasDepan);
			this._canvasAr.push(canvas);

			ha.Main.canvasAktif = canvas;
		}

		static Bersih(r: number = 0, g: number = 0, b: number = 0, alpha: number = 1): void {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
			ctx.fillRect(0, 0, ha.Main.canvasAktif.panjang, ha.Main.canvasAktif.lebar);
		}

		static Color(r: number = 0, g: number = 0, b: number = 0, a: number = 1): void {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		}

		static Grafis(width: number = 320, height: number = 240): void {
			let canvas: IGambar = ha.Main.canvasAktif;

			//check canvas sudah diinit atau belum
			// if (!canvas) {
			// 	if (canvas2) {
			// 		this.init(canvas,)
			// 	}
			// 	// return;
			// 	// setTimeout(() => {
			// 	// 	ha.Main.Grafis(width, height);
			// 	// }, 0);
			// 	// console.log('failed');
			// 	// return;
			// }

			// console.log('ok');

			canvas.canvas.width = width;
			canvas.canvas.height = height;
			canvas.panjang = width;
			canvas.lebar = height;

			setTimeout(() => {
				ha.Blijs.windowResize();
			}, 0);

			// if (canvas2) {
			// 	ha.Main.canvasAktif.canvas.classList.add('gl');
			// }
			// else {
			// 	ha.Main.canvasAktif.canvas.classList.remove('gl');
			// }

			// if (skalaOtomatis) {
			// 	ha.Main.canvasAktif.canvas.classList.add('pixel');
			// }

			// ha_blitz.Main.windowResize();
		}

		static Garis(x1: number, y1: number, x2: number, y2: number) {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
			x1 = Math.floor(x1);
			y1 = Math.floor(y1);
			x2 = Math.floor(x2);
			y2 = Math.floor(y2);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}

		static Kotak(x1: number, y1: number, x2: number, y2: number) {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
			ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
		}

		static SetBuffer(buffer: IGambar) {
			ha.Main.canvasAktif = buffer
		}

		public static get canvasAktif(): IGambar {
			return this._canvasAktif;
		}

		public static set canvasAktif(value: IGambar) {
			this._canvasAktif = value;
		}

		public static get canvasAr(): IGambar[] {
			return this._canvasAr;
		}
		public static set canvasAr(value: IGambar[]) {
			this._canvasAr = value;
		}

		public static get origin(): IV2D {
			return this._origin;
		}
		public static set origin(value: IV2D) {
			this._origin = value;
		}

		public static get fps(): number {
			return this._fps;
		}
		public static set fps(value: number) {
			this._fps = value;
		}
		public static get skalaOtomatis(): boolean {
			return Main._skalaOtomatis;
		}
		public static set skalaOtomatis(value: boolean) {
			Main._skalaOtomatis = value;
		}

	}
}
namespace ha {

	//TODO: beberapa perintah harus mengecheck apakah kanvas sudah di init, dan coba lagi kalau belum bisa
	export class Main {
		private static _fps: number = 0;
		private static _origin: IV2D;
		private static _canvasAr: IGambar[] = [];
		private static _canvasAktif: IGambar;
		private static _skalaOtomatis: boolean = true;

		private static _merah: number = 0;
		private static _hijau: number = 0;
		private static _biru: number = 0;
		private static _transparan: number = 0;

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
				lebarDiSet: true,
				ratioX: 1,
				ratioY: 1
			}

			return canvas;
		}

		static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void {
			let canvas: IGambar = ha.Main.buatCanvas(canvasBelakang);
			ha.Main._canvasAr.push(canvas);

			canvas = ha.Main.buatCanvas(canvasDepan);
			ha.Main._canvasAr.push(canvas);

			ha.Main.canvasAktif = canvas;
		}

		static Bersih(): void {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
			// ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
			ctx.fillRect(0, 0, ha.Main.canvasAktif.panjang, ha.Main.canvasAktif.lebar);
		}

		static warna(r: number = 0, g: number = 0, b: number = 0, a: number = 255): void {

			ha.Main.merah = r;
			ha.Main.biru = b;
			ha.Main.hijau = g;
			ha.Main.transparan = a / 255;

			ha.Main.updateStyleWarna();
		}

		static updateStyleWarna(): void {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;

			ctx.fillStyle = `rgba(${ha.Main.merah}, ${ha.Main.hijau}, ${ha.Main.biru}, ${ha.Main.transparan})`;
			ctx.strokeStyle = `rgba(${ha.Main.merah}, ${ha.Main.hijau}, ${ha.Main.biru}, ${ha.Main.transparan})`;
		}

		static Hijau(a?: number): number {
			if (typeof (a) == 'number') {
				ha.Main.hijau = a;
				ha.Main.updateStyleWarna();
			}

			return ha.Main.hijau;
		}

		static Merah(a?: number): number {
			if (typeof (a) == 'number') {
				ha.Main.merah = a;
				ha.Main.updateStyleWarna();
			}

			return ha.Main.merah;
		}

		static Biru(a?: number): number {
			if (typeof (a) == 'number') {
				ha.Main.biru = a;
				ha.Main.updateStyleWarna();
			}

			debugger;
			return ha.Main.biru;
		}

		static Transparan(a?: number): number {
			if (typeof (a) == 'number') {
				ha.Main.transparan = a / 255;
				ha.Main.updateStyleWarna();
			}

			return ha.Main.transparan;
		}

		static Grafis(width: number = 320, height: number = 240): void {
			let canvas: IGambar = ha.Main.canvasAktif;

			canvas.canvas.width = width;
			canvas.canvas.height = height;
			canvas.canvas.style.width = width + 'px';
			canvas.canvas.style.height = height + 'px';
			canvas.panjang = width;
			canvas.lebar = height;

			setTimeout(() => {
				if (ha.Blijs.skalaOtomatis) {
					ha.Blijs.windowResize();
				}
				else {

				}
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
			return ha.Main._canvasAktif;
		}

		public static set canvasAktif(value: IGambar) {
			ha.Main._canvasAktif = value;
		}

		public static get canvasAr(): IGambar[] {
			return ha.Main._canvasAr;
		}
		public static set canvasAr(value: IGambar[]) {
			ha.Main._canvasAr = value;
		}

		public static get origin(): IV2D {
			return ha.Main._origin;
		}
		public static set origin(value: IV2D) {
			ha.Main._origin = value;
		}

		public static get fps(): number {
			return ha.Main._fps;
		}
		public static set fps(value: number) {
			ha.Main._fps = value;
		}
		public static get skalaOtomatis(): boolean {
			return Main._skalaOtomatis;
		}
		public static set skalaOtomatis(value: boolean) {
			Main._skalaOtomatis = value;
		}
		public static get merah(): number {
			return Main._merah;
		}
		public static set merah(value: number) {
			Main._merah = value;
		}
		public static get hijau(): number {
			return Main._hijau;
		}
		public static set hijau(value: number) {
			Main._hijau = value;
		}
		public static get biru(): number {
			return Main._biru;
		}
		public static set biru(value: number) {
			Main._biru = value;
		}
		public static get transparan(): number {
			return Main._transparan;
		}
		public static set transparan(value: number) {
			Main._transparan = value;
		}
	}
}
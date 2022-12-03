namespace ha {

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

		private static warnaBackup: IWarna = {
			m: 0,
			b: 0,
			h: 0,
			t: 1
		}

		static kontek(spr: ISprite): CanvasRenderingContext2D {
			if (spr && spr.buffer.ctx) {
				return spr.buffer.ctx;
			}

			return ha.Main.canvasAktif.ctx;
		}

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
				rotasi: 0,
				alpha: 1,
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

		static backupWarna(): void {
			ha.Main.warnaBackup.b = ha.Main.biru;
			ha.Main.warnaBackup.h = ha.Main.hijau;
			ha.Main.warnaBackup.m = ha.Main.merah;
			ha.Main.warnaBackup.t = ha.Main.transparan;
		}

		static restoreWarna(): void {
			ha.Main.biru = ha.Main.warnaBackup.b;
			ha.Main.hijau = ha.Main.warnaBackup.h;
			ha.Main.merah = ha.Main.warnaBackup.m;
			ha.Main.transparan = ha.Main.warnaBackup.t;
			ha.Main.updateStyleWarna();
		}

		static Bersih(m: number = 0, h: number = 0, b: number = 0, t: number = 1): void {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
			ha.Main.backupWarna();
			ctx.fillStyle = `rgba(${m}, ${h}, ${b}, ${t})`;
			ctx.fillRect(0, 0, ha.Main.canvasAktif.panjang, ha.Main.canvasAktif.lebar);
			ha.Main.restoreWarna();
		}

		//TODO: warna stroke mungkin beda
		//TODO: untuk yang lain lebih baik pakai native
		static warna(r: number = 0, g: number = 0, b: number = 0, a: number = 1): void {
			let h = ha.Main;

			h.merah = r;
			h.biru = b;
			h.hijau = g;
			h.transparan = a;
			h.updateStyleWarna();
		}

		private static updateStyleWarna(): void {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;

			ctx.fillStyle = `rgba(${ha.Main.merah}, ${ha.Main.hijau}, ${ha.Main.biru}, ${ha.Main.transparan})`;
			ctx.strokeStyle = `rgba(${ha.Main.merah}, ${ha.Main.hijau}, ${ha.Main.biru}, ${ha.Main.transparan})`;
		}

		static Hijau(): number {
			return ha.Main.hijau;
		}

		static Merah(): number {
			return ha.Main.merah;
		}

		static Biru(): number {
			return ha.Main.biru;
		}

		static Transparan(): number {
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

		//kotak
		static Kotak(x1: number, y1: number, x2: number, y2: number, isi: boolean = false, garis: boolean = true, rotasi: number = 0) {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;

			//TODO: rotasi
			rotasi;

			if (isi) {
				ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
			}

			if (garis) {
				ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
			}
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

	interface IWarna {
		m: number,
		h: number,
		b: number,
		t: number
	}
}
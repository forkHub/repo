/**
 *  @namespace ha
 */

/**
 *  @namespace be
 *  @memberof ha
 */

namespace ha.be {

	/**
	 * @memberof ha.be
	 */
	export class Be {
		private static _canvasAr: IGbr[] = [];
		private static _canvasAktif: IGbr;
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

		static Pause() {
			debugger;
		}

		/**
		 * Handle saat window di resize
		 * @private
		 */
		private static windowResize(): void {
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = Be.canvasAktif.canvas;

			let cp = Be.canvasAktif.canvas.width;
			let cl = Be.canvasAktif.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			Be.canvasAktif.ratioX = ratio;
			Be.canvasAktif.ratioY = ratio;

			canvas.style.position = 'fixed';
			canvas.style.zIndex = '1';
			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}

		/**
		 * mengeset/mengembalikan Kontek yang sedang aktif
		 * 
		 * @param ctx (CanvasRenderingContext2D) | null
		 * @returns CanvasRenderingContext2D
		 */
		static Kontek(ctx?: CanvasRenderingContext2D): CanvasRenderingContext2D {
			if (ctx) {
				Be.canvasAktif.ctx = ctx;
			}

			return Be.canvasAktif.ctx;
		}

		static buatCanvas(canvasEl: HTMLCanvasElement): IGbr {
			let canvas: IGbr = {
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
				rect: Kotak.buat(),
				load: true,
				panjangDiSet: true,
				lebarDiSet: true,
				ratioX: 1,
				ratioY: 1,
				ctrIdx: 0
			}

			return canvas;
		}

		static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void {
			let canvas: IGbr = Be.buatCanvas(canvasBelakang);
			Be._canvasAr.push(canvas);

			canvas = Be.buatCanvas(canvasDepan);
			Be._canvasAr.push(canvas);

			Be.canvasAktif = canvas;
		}

		private static backupWarna(): void {
			Be.warnaBackup.b = Be.biru;
			Be.warnaBackup.h = Be.hijau;
			Be.warnaBackup.m = Be.merah;
			Be.warnaBackup.t = Be.transparan;
		}

		private static restoreWarna(): void {
			Be.biru = Be.warnaBackup.b;
			Be.hijau = Be.warnaBackup.h;
			Be.merah = Be.warnaBackup.m;
			Be.transparan = Be.warnaBackup.t;
			Be.updateStyleWarna();
		}

		/**
		 * 
		 * @param merah {angka} warna merah, optional default = 0
		 * @param hijau 
		 * @param biru 
		 * @param transparan 
		 */
		static Bersih(merah: number = 0, hijau: number = 0, biru: number = 0, transparan: number = 100): void {
			let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;
			Be.backupWarna();
			ctx.clearRect(0, 0, Be.canvasAktif.panjang, Be.canvasAktif.lebar);
			ctx.fillStyle = `rgba(${merah}, ${hijau}, ${biru}, ${transparan / 100})`;
			ctx.fillRect(0, 0, Be.canvasAktif.panjang, Be.canvasAktif.lebar);
			Be.restoreWarna();
		}

		/**
		 * Update style warna
		 * @param r (0-255)
		 * @param g (0-255)
		 * @param b (0-255)
		 * @param a (0-100)
		 */
		static Warna(r: number = 0, g: number = 0, b: number = 0, a: number = 100): void {
			let h = Be;

			h.merah = r;
			h.biru = b;
			h.hijau = g;
			h.transparan = a / 100;
			h.updateStyleWarna();
		}

		static StrokeColor(r: number = 0, g: number = 0, b: number = 0, a: number = 100): void {
			let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;
			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		}


		private static updateStyleWarna(): void {
			let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;
			ctx.fillStyle = `rgba(${Be.merah}, ${Be.hijau}, ${Be.biru}, ${Be.transparan})`;
		}

		/**
		 * Mengembalikan warna merah dari perintah AmbilPixel terakhir
		 * @returns (number) warna merah
		 */
		static Hijau(): number {
			return Be.hijau;
		}

		static Merah(): number {
			return Be.merah;
		}

		/**
		 * Mengembalikan warna biru dari perintah AmbilPixel terakhir
		 * @returns (number) warna biru
		 */
		static Biru(): number {
			return Be.biru;
		}

		/**
		 * 
		 * @returns 
		 */
		static Transparan(): number {
			return Math.floor(Be.transparan * 100);
		}

		/**
		 * 
		 * @returns 
		 */
		static Kanvas(): HTMLCanvasElement {
			return Be.canvasAktif.canvas;
		}

		static Grafis(panjang: number = 320, lebar: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true, input: boolean = true) {

			//coba cari canvas
			if (!canvas) {
				canvas = document.body.querySelector('canvas') as HTMLCanvasElement;
			}

			if (!canvas) {
				document.body.appendChild(document.createElement('canvas'));
			}

			Be.skalaOtomatis = fullScreen;
			// ha.be.Blijs._inputStatus = input

			//sudah diinisialisasi atau belum
			if (Be.canvasAktif) {
				console.warn('init lebih dari sekali');
				Be.Grafis2(panjang, lebar, Be.skalaOtomatis);
			}
			else {
				console.log('inisialisasi');
				Be.init(canvas, canvas);
				Be.Grafis2(panjang, lebar, Be.skalaOtomatis);

				if (input) {
					Input.init(Be.canvasAktif);
				}

				if (Be.skalaOtomatis) {
					window.onresize = (): void => {
						if (Be.skalaOtomatis) {
							Be.windowResize();
						}
					}
				}

				if (Be.skalaOtomatis) {
					Be.windowResize();
				}

				setTimeout(() => {
					if (Be.skalaOtomatis) {
						Be.windowResize();
					}
				}, 100);

				// setTimeout(() => {
				// 	ha.be.Blijs.repeat();
				// }, 0);

				//font default
				// Teks.Font("12px cursive");
				Teks.Rata("left");
				Teks.Goto(0, 10);
				Be.Warna(255, 255, 255, 100);
				Be.canvasAktif.ctx.strokeStyle = "#ffffff";
			}
		}


		/** 
		 * @private 
		 * helper method
		 * */
		private static Grafis2(p: number = 320, l: number = 240, ubahStyle: boolean): void {
			let canvas: IGbr = Be.canvasAktif;

			canvas.canvas.width = p;
			canvas.canvas.height = l;

			if (ubahStyle) {
				canvas.canvas.style.width = p + 'px';
				canvas.canvas.style.height = l + 'px';
				canvas.canvas.style.padding = '0px';
				canvas.canvas.style.margin = '0px';
			}

			canvas.panjang = p;
			canvas.lebar = l;

			setTimeout(() => {
				if (Be.skalaOtomatis) {
					Be.windowResize();
				}
				else {

				}
			}, 0);

			// if (canvas2) {
			// 	Main.canvasAktif.canvas.classList.add('gl');
			// }
			// else {
			// 	Main.canvasAktif.canvas.classList.remove('gl');
			// }

			// if (skalaOtomatis) {
			// 	Main.canvasAktif.canvas.classList.add('pixel');
			// }

			// ha_blitz.Main.windowResize();
		}

		/**
		 * 
		 * @param x1 
		 * @param y1 
		 * @param x2 
		 * @param y2 
		 */
		static Garis(x1: number, y1: number, x2: number, y2: number) {
			let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;

			x1 = Math.floor(x1);
			y1 = Math.floor(y1);
			x2 = Math.floor(x2);
			y2 = Math.floor(y2);

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}

		/**
		 * 
		 * @param x1 
		 * @param y1 
		 * @param x2 
		 * @param y2 
		 * @param isi 
		 * @param garis 
		 * @param rotasi 
		 */
		static Kotak(x1: number, y1: number, x2: number, y2: number, isi: boolean = false, garis: boolean = true, rotasi: number = 0) {
			let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;

			//TODO: rotasi
			rotasi;

			if (isi) {
				ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
			}

			if (garis) {
				ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
			}
		}

		/**
		 * Menggambar Oval
		 * @param x posisi x
		 * @param y posisi y
		 * @param radius radius
		 * @param skalaX skala horizontal
		 * @param skalaY skala vertikal
		 * @param rotasi sudut oval
		 */
		static Oval(x: number = 0, y: number = 0, radius: number, skalaX: number = 1, skalaY = .5, rotasi: number = 0) {
			let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;

			// save state
			ctx.save();

			// translate context
			ctx.translate(x, y);

			ctx.rotate(rotasi * (Math.PI / 180));

			// scale context horizontally
			ctx.scale(skalaX, skalaY);

			// draw circle which will be stretched into an oval
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);

			// restore to original state
			ctx.restore();
			ctx.stroke();
		}

		public static get canvasAktif(): IGbr {
			return Be._canvasAktif;
		}

		public static set canvasAktif(value: IGbr) {
			Be._canvasAktif = value;
		}

		public static get canvasAr(): IGbr[] {
			return Be._canvasAr;
		}
		public static set canvasAr(value: IGbr[]) {
			Be._canvasAr = value;
		}

		// public static get origin(): IV2D {
		// 	return Main._origin;
		// }

		// public static set origin(value: IV2D) {
		// 	Main._origin = value;
		// }

		// public static get fps(): number {
		// 	return Main._fps;
		// }

		// public static set fps(value: number) {
		// 	Main._fps = value;
		// }

		public static get skalaOtomatis(): boolean {
			return Be._skalaOtomatis;
		}

		public static set skalaOtomatis(value: boolean) {
			Be._skalaOtomatis = value;
		}

		public static get merah(): number {
			return Be._merah;
		}

		public static set merah(value: number) {
			Be._merah = value;
		}

		public static get hijau(): number {
			return Be._hijau;
		}

		public static set hijau(value: number) {
			Be._hijau = value;
		}

		public static get biru(): number {
			return Be._biru;
		}

		public static set biru(value: number) {
			Be._biru = value;
		}

		public static get transparan(): number {
			return Be._transparan;
		}

		public static set transparan(value: number) {
			Be._transparan = value;
		}
	}

	interface IWarna {
		m: number,
		h: number,
		b: number,
		t: number
	}
}
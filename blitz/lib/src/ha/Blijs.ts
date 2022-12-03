/**
 * BLIJS
 */

namespace ha {
	export class Blijs {
		private static _skalaOtomatis: boolean = true;

		/**
		 * Setup Blitz Edu
		 * @param panjang (angka) panjang dari kanvas
		 * @param lebar (angka) lebar dari kanvs
		 * @param canvas (HTMLCanvasElement) referensi ke kanvas
		 * @param skalaOtomatis (boolean) apakah akan men-skala kanvas mengikuti ukuran layar  
		 * @returns 
		 */
		static init(panjang: number = 320, lebar: number = 240, canvas: HTMLCanvasElement = null, skalaOtomatis: boolean = true) {

			//coba cari canvas
			if (!canvas) canvas = document.body.querySelector('canvas') as HTMLCanvasElement;
			if (!canvas) {
				console.log('gagal init');
				return;
			}

			ha.Blijs.skalaOtomatis = skalaOtomatis;

			//sudah diinisialisasi atau belum
			if (ha.Main.canvasAktif) {
				console.warn('init lebih dari sekali');
				ha.Main.Grafis(panjang, lebar);
			}
			else {
				console.log('inisialisasi');
				ha.Main.init(canvas, canvas);
				ha.Main.Grafis(panjang, lebar);
				ha.input.init(ha.Main.canvasAktif);

				window.onresize = (): void => {
					if (ha.Blijs.skalaOtomatis) {
						ha.Blijs.windowResize();
					}
				}

				if (ha.Blijs.skalaOtomatis) {
					ha.Blijs.windowResize();
				}

				setTimeout(() => {
					if (ha.Blijs.skalaOtomatis) {
						ha.Blijs.windowResize();
					}
				}, 100);

				setTimeout(() => {
					ha.Blijs.repeat();
				}, 0);

				//font
				ha.Teks.font("30px Arial");
				ha.Teks.rata("left");
			}
		}

		static loop(): void {
			let _window: any = window;
			if (typeof (_window.Loop) == 'function') {
				//TODO: pre loop
				_window.Loop();
				//TODO: post loop
			}
			else if (typeof (_window.Update) == 'function') {
				//TODO: pre loop
				_window.Update();
				//TODO: post loop

			}
		}

		static repeat() {
			//check semua image sudah diload

			ha.Blijs.loop();

			setTimeout(() => {
				requestAnimationFrame(() => {
					ha.Blijs.repeat();
				});
			}, ha.Main.fps);
		}

		static windowResize(): void {
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = ha.Main.canvasAktif.canvas;

			let cp = ha.Main.canvasAktif.canvas.width;
			let cl = ha.Main.canvasAktif.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			ha.Main.canvasAktif.ratioX = ratio;
			ha.Main.canvasAktif.ratioY = ratio;

			canvas.style.position = 'fixed';
			canvas.style.zIndex = '9999';
			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}

		public static get skalaOtomatis(): boolean {
			return Blijs._skalaOtomatis;
		}
		public static set skalaOtomatis(value: boolean) {
			Blijs._skalaOtomatis = value;
		}

	}
}

// setTimeout(() => {
// 	ha.Blijs.init()
// }, 0);
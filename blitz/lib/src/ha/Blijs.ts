/**
 * BLIJS
 */

namespace ha {
	export class Blijs {
		static init(canvas?: HTMLCanvasElement) {
			if (!canvas) canvas = document.body.querySelector('canvas') as HTMLCanvasElement;
			if (!canvas) {
				console.log('gagal init');
				return;
			}

			ha.Main.init(canvas, canvas);
			ha.input.init(ha.Main.canvasAktif);

			window.onresize = async (): Promise<void> => {
				this.windowResize();
			}

			setTimeout(() => {
				this.windowResize();
			}, 100);

			// let _window: any = window;

			setTimeout(() => {
				this.repeat();
				// if (typeof _window.Mulai__ == "function") {
				// 	console.log('window start function called');

				// 	_window.Mulai()
				// 		.then(() => {
				// 			this.repeat();
				// 		})
				// 		.catch((e: Error) => {
				// 			console.error(e);
				// 		})
				// }
				// else {
				// 	console.warn('start not found');
				// 	this.repeat();
				// }
			}, 0);
		}

		static loop = (): void => {
			let _window: any = window;
			if (typeof _window.Loop == 'function') {
				//TODO: pre loop
				_window.Loop();
				//TODO: post loop
			}
		}

		static repeat = () => {
			//check semua image sudah diload

			this.loop();
			setTimeout(() => {
				requestAnimationFrame(() => {
					this.repeat();
				});
			}, 0);

			// .then(() => {
			// 	setTimeout(() => {
			// 		requestAnimationFrame(this.repeat);
			// 	}, 0);
			// }).
			// catch((e) => {
			// 	console.error(e);
			// });
		}

		static windowResize = (): void => {
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

			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}
	}
}

setTimeout(() => {
	ha.Blijs.init()
}, 0);
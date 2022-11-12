/**
 * BLIJS
 */

namespace ha_blijs {
	class Blijs {
		init(canvas: HTMLCanvasElement) {

			ha_blitz.main.init(canvas, canvas);
			ha.input.init(ha_blitz.main.canvasAktif);

			window.onresize = async (): Promise<void> => {
				this.windowResize();
			}

			setTimeout(() => {
				this.windowResize();
			}, 100);

			let _window: any = window;

			setTimeout(() => {
				if (typeof _window.Start == "function") {
					console.log('window start function called');

					_window.Start()
						.then(() => {
							this.repeat();
						})
						.catch((e: Error) => {
							console.error(e);
						})
				}
				else {
					console.warn('start not found');
					this.repeat();
				}
			}, 0);
		}

		loop = async (): Promise<void> => {
			let _window: any = window;
			if (typeof _window.Loop == 'function') {
				await _window.Loop();
			}
			else if (typeof _window.loop == 'function') {
				await _window.loop();
			}
		}

		repeat = () => {
			this.loop()
				.then(() => {
					setTimeout(() => {
						requestAnimationFrame(this.repeat);
					}, 0);
				}).
				catch((e) => {
					console.error(e);
				});
		}

		windowResize = (): void => {
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = ha_blitz.main.canvasAktif.canvas;

			let cp = ha_blitz.main.canvasAktif.canvas.width;
			let cl = ha_blitz.main.canvasAktif.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			ha_blitz.main.canvasAktif.scaleX = ratio;
			ha_blitz.main.canvasAktif.scaleY = ratio;

			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}
	}

	export var blijs: Blijs = new Blijs();
}

window.onload = () => {
	console.log('window onload:');

	let canvas: HTMLCanvasElement = document.body.querySelector('canvas') as HTMLCanvasElement;
	ha_blijs.blijs.init(canvas)

	// window.onresize = async (): Promise<void> => {
	// 	ha_blijs.blijs.windowResize();
	// }

	// ha_blijs.blijs.windowResize();

	// let _window: any = window;

	// setTimeout(() => {
	// 	if (typeof _window.Start == "function") {
	// 		console.log('window start');

	// 		_window.Start()
	// 			.then(() => {
	// 				ha_blijs.blijs.repeat();
	// 			})
	// 			.catch((e: Error) => {
	// 				console.error(e);
	// 			})
	// 	}
	// 	else {
	// 		console.warn('start not found');
	// 		ha_blijs.blijs.repeat();
	// 	}
	// }, 0);
}
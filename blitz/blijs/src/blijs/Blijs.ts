/**
 * BLIJS
 */

namespace ha_blijs {
	class Blijs {
		init(canvas: HTMLCanvasElement) {

			ha_blitz.Main.init(canvas, canvas);
			ha.input.init(ha_blitz.Main.canvasAktif);

			window.onresize = async (): Promise<void> => {
				this.windowResize();
			}

			setTimeout(() => {
				this.windowResize();
			}, 100);

			let _window: any = window;

			setTimeout(() => {
				if (typeof _window.Mulai__ == "function") {
					console.log('window start function called');

					_window.Mulai()
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
				//TODO: pre loop
				await _window.Loop();
				//TODO: post loop
			}
			else {

			}
		}

		repeat = () => {
			//check semua image sudah diload



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
			let canvas: HTMLCanvasElement = ha_blitz.Main.canvasAktif.canvas;

			let cp = ha_blitz.Main.canvasAktif.canvas.width;
			let cl = ha_blitz.Main.canvasAktif.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			ha_blitz.Main.canvasAktif.scaleX = ratio;
			ha_blitz.Main.canvasAktif.scaleY = ratio;

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
}
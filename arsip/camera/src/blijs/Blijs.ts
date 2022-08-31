
/**
 * Wrapper
 */

namespace ha.blijs {
	class Blijs {
		init() {
			ha.blitz.main.canvasInit();
			ha.input.init(ha.blitz.main.canvasAktif);

			window.onresize = async (): Promise<void> => {
				ha.blitz.main.windowResize();
			}

			ha.blitz.main.windowResize();

			let _window: any = window;

			setTimeout(() => {
				if (typeof _window.Start == "function") {
					_window.Start()
						.then(() => {
							ha.blitz.main.repeat();
						})
						.catch((e: Error) => {
							console.error(e);
						})
				}
				else {
					console.warn('start not found');
					ha.blitz.main.repeat();
				}
			}, 0);
		}
	}

	export var blijs: Blijs = new Blijs();
}

//TODO: diubah, di handle oleh yang panggil
window.onload = () => {
	ha.blitz.main.canvasInit();
	ha.input.init(ha.blitz.main.canvasAktif);

	window.onresize = async (): Promise<void> => {
		ha.blitz.main.windowResize();
	}

	ha.blitz.main.windowResize();

	let _window: any = window;

	setTimeout(() => {
		if (typeof _window.Start == "function") {
			_window.Start()
				.then(() => {
					ha.blitz.main.repeat();
				})
				.catch((e: Error) => {
					console.error(e);
				})
		}
		else {
			console.warn('start not found');
			ha.blitz.main.repeat();
		}
	}, 0);
}
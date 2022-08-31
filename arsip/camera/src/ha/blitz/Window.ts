namespace ha.blitz {

	class Main {
		private _fps: number = 1000 / 30;
		private _origin: IV2D;
		private _canvasAr: IBuffer[] = [];
		private _canvasAktif: IBuffer;

		buatCanvas(buffer: string): IBuffer {
			let canvasEl: HTMLCanvasElement = window.document.body.querySelector(`canvas.${buffer}`);
			let canvas: IBuffer = {
				canvas: canvasEl,
				ctx: canvasEl.getContext('2d'),
				height: canvasEl.height,
				scaleX: 1,
				scaleY: 1,
				width: canvasEl.width,
				frameH: canvasEl.height,
				frameW: canvasEl.width,
				handleX: 0,
				handleY: 0,
				img: null,
				isAnim: false,
				rotation: 0,
				rect: ha.rect.create()
			}

			return canvas;
		}

		canvasInit(): void {
			let canvas: IBuffer = this.buatCanvas('back-buffer');
			this._canvasAr.push(canvas);

			canvas = this.buatCanvas('front-buffer');
			this._canvasAr.push(canvas);

			ha.blitz.main.canvasAktif = canvas;
		}

		windowResize = (): void => {
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = ha.blitz.main._canvasAktif.canvas;

			let cp = ha.blitz.main._canvasAktif.canvas.width;
			let cl = ha.blitz.main._canvasAktif.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			ha.blitz.main._canvasAktif.scaleX = ratio;
			ha.blitz.main._canvasAktif.scaleY = ratio;

			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}

		loop = async (): Promise<void> => {
			let _window: any = window;
			if (typeof _window.Loop == 'function') {
				await _window.Loop();
			}
		}

		repeat = () => {
			this.loop()
				.then(() => {
					setTimeout(() => {
						requestAnimationFrame(this.repeat);
					}, ha.blitz.main._fps);
				}).
				catch((e) => {
					console.error(e);
				});
		}

		public get canvasAktif(): IBuffer {
			return this._canvasAktif;
		}
		public set canvasAktif(value: IBuffer) {
			this._canvasAktif = value;
		}

		public get canvasAr(): IBuffer[] {
			return this._canvasAr;
		}
		public set canvasAr(value: IBuffer[]) {
			this._canvasAr = value;
		}

		public get origin(): IV2D {
			return this._origin;
		}
		public set origin(value: IV2D) {
			this._origin = value;
		}

		public get fps(): number {
			return this._fps;
		}
		public set fps(value: number) {
			this._fps = value;
		}


	}

	export var main: Main = new Main();
}
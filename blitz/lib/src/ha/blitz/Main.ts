namespace ha_blitz {

	class Main {
		private _fps: number = 1000 / 30;
		private _origin: IV2D;
		private _canvasAr: IGambar[] = [];
		private _canvasAktif: IGambar;

		buatCanvas(canvasEl: HTMLCanvasElement): IGambar {
			// let canvasEl: HTMLCanvasElement = window.document.body.querySelector(`canvas.${buffer}`);
			let canvas: IGambar = {
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
				rect: ha.Rect.create()
			}

			return canvas;
		}

		init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void {
			let canvas: IGambar = this.buatCanvas(canvasBelakang);
			this._canvasAr.push(canvas);

			canvas = this.buatCanvas(canvasDepan);
			this._canvasAr.push(canvas);

			ha_blitz.main.canvasAktif = canvas;
		}

		public get canvasAktif(): IGambar {
			return this._canvasAktif;
		}
		public set canvasAktif(value: IGambar) {
			this._canvasAktif = value;
		}

		public get canvasAr(): IGambar[] {
			return this._canvasAr;
		}
		public set canvasAr(value: IGambar[]) {
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
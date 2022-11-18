namespace ha_blitz {

	export class Main {
		private static _fps: number = 1000 / 30;
		private static _origin: IV2D;
		private static _canvasAr: IGambar[] = [];
		private static _canvasAktif: IGambar;

		static buatCanvas(canvasEl: HTMLCanvasElement): IGambar {
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
				rect: ha.Rect.create(),
				load: true
			}

			return canvas;
		}

		static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void {
			let canvas: IGambar = this.buatCanvas(canvasBelakang);
			this._canvasAr.push(canvas);

			canvas = this.buatCanvas(canvasDepan);
			this._canvasAr.push(canvas);

			ha_blitz.Main.canvasAktif = canvas;
		}

		static Bersih = (r: number = 0, g: number = 0, b: number = 0, alpha: number = 1): void => {
			let ctx: CanvasRenderingContext2D = ha_blitz.Main.canvasAktif.ctx;
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
			ctx.fillRect(0, 0, ha_blitz.Main.canvasAktif.width, ha_blitz.Main.canvasAktif.height);
		}

		static Color = (r: number = 0, g: number = 0, b: number = 0, a: number = 1) => {
			let ctx: CanvasRenderingContext2D = ha_blitz.Main.canvasAktif.ctx;
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		}

		static Grafis = (width: number = 320, height: number = 240, gl: boolean = true, pixel: boolean = true): void => {
			let canvas: IGambar = ha_blitz.Main.canvasAktif;

			canvas.canvas.width = width;
			canvas.canvas.height = height;
			canvas.width = width;
			canvas.height = height;

			if (gl) {
				ha_blitz.Main.canvasAktif.canvas.classList.add('gl');
			}
			else {
				ha_blitz.Main.canvasAktif.canvas.classList.remove('gl');
			}

			if (pixel) {
				ha_blitz.Main.canvasAktif.canvas.classList.add('pixel');
			}

			// ha_blitz.Main.windowResize();
		}

		static Garis = (x1: number, y1: number, x2: number, y2: number) => {
			let ctx: CanvasRenderingContext2D = ha_blitz.Main.canvasAktif.ctx;
			x1 = Math.floor(x1);
			y1 = Math.floor(y1);
			x2 = Math.floor(x2);
			y2 = Math.floor(y2);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}

		static Kotak = (x1: number, y1: number, x2: number, y2: number) => {
			let ctx: CanvasRenderingContext2D = ha_blitz.Main.canvasAktif.ctx;
			ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
		}

		static SetBuffer = (buffer: IGambar) => {
			ha_blitz.Main.canvasAktif = buffer
		}

		public static get canvasAktif(): IGambar {
			return this._canvasAktif;
		}

		public static set canvasAktif(value: IGambar) {
			this._canvasAktif = value;
		}

		public static get canvasAr(): IGambar[] {
			return this._canvasAr;
		}
		public static set canvasAr(value: IGambar[]) {
			this._canvasAr = value;
		}

		public static get origin(): IV2D {
			return this._origin;
		}
		public static set origin(value: IV2D) {
			this._origin = value;
		}

		public static get fps(): number {
			return this._fps;
		}
		public static set fps(value: number) {
			this._fps = value;
		}

	}
}
namespace ha.be {

	export class Teks {
		private static nama: string = 'cursive';
		private static ukuran: number = 30;
		private static x: number = 0;
		private static y: number = 0;
		private static _stroke: boolean = false;
		private static _jarak: number = 40;
		private static _fill: boolean = true;

		public static get stroke(): boolean {
			return Teks._stroke;
		}
		public static set stroke(value: boolean) {
			Teks._stroke = value;
		}
		public static get fill(): boolean {
			return Teks._fill;
		}
		public static set fill(value: boolean) {
			Teks._fill = value;
		}
		public static get jarak(): number {
			return Teks._jarak;
		}
		public static set jarak(value: number) {
			Teks._jarak = value;
		}

		private static get ctx(): CanvasRenderingContext2D {
			return Be.canvasAktif.ctx;
		}

		static Goto(x: number, y: number): void {
			this.x = x;
			this.y = y;
		}

		static Write(str: string): void {
			this.Tulis(str, this.x, this.y, this.fill, this.stroke);
		}

		static WriteLn(str: string): void {
			this.Tulis(str, this.x, this.y, this.fill, this.stroke);
			this.y += this.jarak;
		}

		/**
		 * 
		 * @param nama 
		 */
		static Font(nama: string = 'cursive'): void {
			this.nama = nama;
			Teks.ctx.font = this.nama + this.ukuran + 'px';
		}

		static FontSize(n: number = 30): void {
			this.ukuran = n;
			Teks.ctx.font = this.nama + this.ukuran + 'px';
		}

		/**
		 * 
		 * @param rata (string) "center" | "end" | "left" | "right" | "start"
		 */
		static Rata(rata: CanvasTextAlign = "left"): void {
			Teks.ctx.textAlign = rata;

		}

		/**
		 * menulis teks di kanvas
		 * @param teks (string)
		 * @param x (number)
		 * @param y (number)
		 * @param warna (boolean=true) apakah akan mengisi teks dengan warna
		 * @param garis (boolean=false) apakah akan menggunakan outline
		 */
		static Tulis(teks: string, x: number, y: number, warna: boolean = true, garis: boolean = false): void {

			if (warna) {
				Teks.ctx.fillText(teks, x, y);
			}

			if (garis) {
				Teks.ctx.strokeText(teks, x, y);
			}
		}

	}
}
namespace ha.be {


	export class Teks {

		private static get ctx(): CanvasRenderingContext2D {
			return Be.canvasAktif.ctx;
		}

		/**
		 * 
		 * @param font 
		 */
		static Font(font: string = '30px Arial'): void {
			Teks.ctx.font = font;
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
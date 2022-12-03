namespace ha {
	export class Teks {

		private static get ctx(): CanvasRenderingContext2D {
			return ha.Main.canvasAktif.ctx;
		}

		static font(font: string = '30px Arial'): void {
			ha.Teks.ctx.font = font;
		}

		static rata(rata: CanvasTextAlign = "left"): void {
			ha.Teks.ctx.textAlign = rata;
		}

		static tulis(teks: string, x: number, y: number, warna: boolean = true, garis: boolean = false): void {
			ha.Teks.ctx.textAlign = 'left';

			if (warna) {
				ha.Teks.ctx.fillText(teks, x, y);
			}

			if (garis) {
				ha.Teks.ctx.strokeText(teks, x, y);
			}
		}

	}
}
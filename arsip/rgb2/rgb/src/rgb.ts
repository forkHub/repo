namespace rgb {
	export function tambah(rgb1: IRgb, rgb2: IRgb): IRgb {
		return {
			r: Math.floor((rgb1.r + rgb2.r)),
			b: Math.floor((rgb1.b + rgb2.b)),
			g: Math.floor((rgb1.g + rgb2.g))
		}
	}

	export function buat(r: number, g: number, b: number): IRgb {
		return {
			r: r,
			g: g,
			b: b
		}
	}

	export function buatWarna(rgb1: IRgb, rgb2: IRgb, rgb3: IRgb): IRgb[] {
		let hasil: IRgb[] = [];

		hasil.push(normal(tambah(rgb1, rgb2)));
		hasil.push(normal(tambah(rgb2, rgb3)));
		hasil.push(normal(tambah(rgb1, rgb3)));

		return hasil;
	}

	function terbesar(rgb: IRgb): number {
		let hasil: number = rgb.r;

		if (rgb.b > hasil) {
			hasil = rgb.b;
		}

		if (rgb.g > hasil) {
			hasil = rgb.g;
		}

		return hasil;
	}

	export function normal(rgb: IRgb): IRgb {
		let hasil: IRgb;
		let mak: number;

		mak = terbesar(rgb);

		hasil = {
			r: Math.floor((rgb.r / mak) * 255),
			b: Math.floor((rgb.b / mak) * 255),
			g: Math.floor((rgb.g / mak) * 255)
		}

		return hasil;
	}
}

interface IRgb {
	r: number,
	g: number,
	b: number
}
namespace md {

	export async function init(): Promise<void> {
		await halModul.init();
		menuWdh.appendChild(halModul.tombolWdh);
		halModul.attach(halWdh);
	}

	export function reset(): void {
		Modul.reset();
		ModulItemView.reset();
		// halModul.reset();
	}

	export async function load(data: IData[]): Promise<void> {
		reset();
		Modul.load(data);
		for (let i: number = 0; i < Modul.daftar.length; i++) {
			await ModulItemView.buat(Modul.daftar[i], halModul.daftarWdh);
		}
	}

}
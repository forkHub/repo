namespace md {

	export async function init(): Promise<void> {
		await halModul.init();
		menuWdh.appendChild(halModul.tombolWdh);
		halModul.attach(halWdh);
	}

	export function reset(): void {
		Modul.reset();
		halModul.reset();
	}

	export async function load(data: IData[]): Promise<void> {
		reset();
		Modul.load(data);
		for (let i: number = 0; i < Modul.daftar.length; i++) {
			await halModul.baru(Modul.daftar[i]);
		}
	}

}
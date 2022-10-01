namespace md {
	export interface IModul {
		id: number,
		nama: string,
		anak: number[]
	}

	export interface IModulEvt {
		baru: (modul: IModul) => void;
	}
}

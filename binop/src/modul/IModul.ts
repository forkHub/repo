namespace md {
	export interface IModul {
		id: number,
		type: string;
		nama: string,
		anak: number[],
		induk: number
	}

	export interface IModulEvt {
		baru: (modul: IModul) => void;
	}
}

interface IModul extends IData {
	// view?: md.View
	varAr: number[],
	fungAr: number[],
	modulAr: number[]
}

interface IVar extends IData {
	nilai: string;
}

interface IDekFungsi extends IData {
	varAr: number[],
	fungAr: number[],
}

interface IParam extends IData {
	prevIdx: number;
}

interface IArg extends IData {
	refParamId: number,
	value: string,	//berisi value atau id referensi
	tipeArg: string //
}

interface IValue extends IData {
	tipeValue: "teks" | "angka" | "ar_angka" | "ar_teks", //ar pakai id
	value: string
}
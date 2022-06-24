interface IModul extends IData {
	// view?: md.View
}

interface IVar extends IData {
	// view?: variable.ent.View;
}

interface IDekFungsi extends IData {
	// view?: fung.dek.ent.View
}

interface IParam extends IData {
	prevIdx: number;
	// view?: param.View
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
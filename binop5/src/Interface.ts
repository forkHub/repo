interface ISimpan {
    modul: IModul[],
    var: IVar[],
    dekFung: IDekFungsi[]
    param: IParam[],
    value: IValue[],
    stmt: IStmt[],
    exp: IExp[],
    ref: IRef[]
}

interface IData {
    id: number
    indukId: number
    type: string
    // dipilih: boolean
    // diedit: boolean
    nama: string
}

interface IModul extends IData {
    // view?: md.View
}

interface IVar extends IData {
    // view?: variable.ent.View;
}

//TODO: dihapus
interface IDekFungsi extends IData {
    // view?: fung.dek.ent.View
}

interface IParam extends IData {
    // view?: param.View
}

interface IStmt extends IData {
    stmtType: string;
}

interface IVarIsi extends IStmt {

}

interface IValue extends IData {
    valueType: "teks" | "angka" | "ar_angka" | "ar_teks", //ar pakai id
    value: string
}

interface IRef extends IData {
    refId: number;
}

interface IExp extends IData {

}
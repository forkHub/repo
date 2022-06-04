interface ISimpan {
    modul: IModul[],
    var: IVar[],
    dekFung: IFungDek[]
    param?: IParam[]
}

interface IData {
    id: number
    indukId: number
    type: string
    dipilih: boolean
    diedit: boolean
    nama: string
}

interface IModul extends IData {
    view?: modul.View
}

interface IVar extends IData {
    view?: variable.View;
}

interface IFungDek extends IData {
    view?: fung.dek.View
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
    valueType: "teks" | "angka" | "ar_angka" | "ar_teks",
    value: string
}

interface IRef extends IData {
    refId: number;
}

interface IExp extends IData {

}
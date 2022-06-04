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
    var1?: IRef,
    var2?: IValue
}

interface IValue extends IData {
    valueType: string,
    value: string
}

interface IRef extends IData {
    refId: number;
}
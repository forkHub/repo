interface ISimpan {
    modul: IModul[],
    var: IVar[],
    dekFung: IFungDek[]
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
    view?: param.View
}

interface INama extends IData {
    view?: nama.View
}
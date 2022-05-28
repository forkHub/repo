interface IData {
    id: number
    indukId: number
    type: string
    dipilih: boolean
    nama: string
}

interface IModul extends IData {
    view?: modul.View
}

interface IVar extends IData {
    view?: variable.View;
}

interface IFungDek extends IData {
    // view?:
}

interface IParam extends IData {
    view?: param.View
}
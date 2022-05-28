interface IBinop extends IData {
    view?: binop.View
}

interface IParam extends IData {
    paramType: string
    view?: param.View
}

interface ILiteral extends IData {
    value: string,
    view?: literal.View
}

interface IData {
    id: number
    indukId: number
    type: string
    dipilih: boolean
    // view: ha.comp.BaseComponent
}

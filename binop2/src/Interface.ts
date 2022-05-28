interface IBinop {
    id: number,
    paramKiri: IParam,
    operator: IParam,
    paramKanan: IParam,

    view?: ha.binop.Binop
}

interface IParam {
    value: IValue,

    //gak disimpan
    induk?: IBinop;
    view?: ha.binop.Param
}

interface IValue {
    type: string,
    value: {
        angka: number,
        teks: string,
        varRef?: number,
        binopRef?: number
    }

    view?: ha.binop.Literal
}

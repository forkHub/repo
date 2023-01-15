interface IEntity {
    id: string,
    type: string
}

interface IParam extends IEntity {
    exp: IExp
}

interface IDekParam extends IEntity {
    nama: string,
    type: string
}

interface IVarRef extends IEntity {
    ref: IDekVar;
}

interface IStmt extends IEntity {
    stmtType: string
}

interface IBinop extends IEntity {
    exp1: IExp
    opr: string
    exp2: IExp
}

interface IExp extends IEntity {
    expType: string;
    ref: IExp | number | string | IVarRef | IBinop
}

interface SetVar extends IStmt {
    ref: IDekVar
    value: IExp
}

interface IIf extends IStmt {
    exp: IExp
    cabang?: IElseIf | IElse
}

interface IElseIf extends IEntity {
    exp: IBinop
    cabang: IElse
}

interface IElse extends IEntity {
    exp: IBinop
}

interface IFor extends IEntity {
    varRef: IVarRef
    exp: IExp
    to: IExp
    stmt: IStmt[]
}

interface IDekVar extends IEntity {
    nama: string,
    type: string,
    value: string | number
}

interface IDekFungsi extends IEntity {
    nama: string,
    dekParam: IDekParam[],
    stmt: IStmt[]
}

interface IModul extends IEntity {
    subs: IModul[];
    dekFungsi: IDekFungsi[];
    dekVar: IDekVar[]
}
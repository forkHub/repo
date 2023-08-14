export enum EType {
    projek = 'projek',
    modul = 'modul',
    stmt = 'stmt',
    exp = 'exp',
    var = 'var',
    df = 'deklarasi fungsi'
}

export enum EStmtType {
    funcDec = 'func_dec',
    varDec = 'var_dec',
}

export enum EExpType {
    angka = 'angka',
    text = 'text'
}

export type TEntity = {
    id: number;
    type: EType;
    indukId: number,
    nama: string
}

export interface IMember {
    anak: number[]
}

export interface IModul extends TEntity, IMember {
    anak: number[];
}

export interface IVar extends TEntity {
}

export interface IDF extends TEntity, IMember {
    param: number[]
}

export interface IProjek extends TEntity {
    root: number;
}
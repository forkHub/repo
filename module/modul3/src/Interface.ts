interface IEntity {
    id: number
    tipe: 'modul' | 'variable'
}

interface IModul extends IEntity {
    nama: string,
    subModul: IModul[]
    variabel: IVariable[]
}

interface IVariable extends IEntity {
    nama: string,
    tipeVar: 'angka' | 'teks' | 'object',
    value: string
}

type IAnakModul = IModul | IVariable

interface IData extends IEntity, IModul, IVariable {

}

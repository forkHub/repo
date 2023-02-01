interface IEntity {
    id: number
    tipe: 'modul' | 'variable'
}

interface IModul extends IEntity {
    nama: string,
    anak: IModul[] | IVariable[]
}

interface IVariable extends IEntity {
    nama: string,
    tipeVar: 'angka' | 'teks',
    value: string
}

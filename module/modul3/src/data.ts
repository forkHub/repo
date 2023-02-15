let data: IModul = {
    id: ha.comp.Id.id,
    tipe: "modul",
    nama: 'root',
    variabel: [
        {
            id: ha.comp.Id.id,
            tipe: 'variable',
            nama: 'var1',
            tipeVar: 'angka',
            value: '123'
        }
    ],
    subModul: [
        {
            id: ha.comp.Id.id,
            tipe: "modul",
            nama: 'modul 1',
            subModul: [],
            variabel: []
        },
        {
            id: ha.comp.Id.id,
            tipe: "modul",
            nama: 'modul 2',
            subModul: [],
            variabel: []
        }
    ]
}

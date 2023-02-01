let data = {
    id: ha.comp.Id.id,
    tipe: "modul",
    nama: 'root',
    anak: [
        {
            id: ha.comp.Id.id,
            tipe: "modul",
            nama: 'modul 1',
            anak: [
                {
                    id: ha.comp.Id.id,
                    tipe: 'variable',
                    nama: 'var_angka',
                    tipeVar: 'angka',
                    value: '2'
                }
            ]
        },
        {
            id: ha.comp.Id.id,
            tipe: "modul",
            nama: 'modul 2',
            anak: []
        }
    ]
};

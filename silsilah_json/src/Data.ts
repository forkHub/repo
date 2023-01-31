const data: ISlAnggota = {
    nama: 'kakek',
    pas: 'nenek',
    anak: [
        {
            nama: 'ayah',
            pas: 'ibu',
            anak: [
                {
                    nama: 'kakak',
                    anak: []
                },
                {
                    nama: 'putra',
                    anak: []
                },
                {
                    nama: 'putri',
                    anak: []
                },
                {
                    nama: 'adik',
                    anak: []
                }

            ]
        },
        {
            nama: 'paman',
            pas: 'bibi',
            anak: []
        }
    ]
}

// const data: ISlAnggota = {
//     nama: 'kakek',
//     pas: 'nenek',
//     anak: [
//         {
//             nama: 'ayah',
//             pas: 'ibu',
//             anak: []
//         }
//     ]
// }
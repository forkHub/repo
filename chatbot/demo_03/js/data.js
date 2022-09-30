/**
 * data untuk chatbot
 */
const data = [
    {
        isi: `
            Assalamu'alaikum. <br/>
            Hari ini kita akan belajar bersama. <br/>
            Sebelum mulai, mari kenalan dulu yuk <br/>
            Siapa namamu?
        `,
        gotoDef: ['pilih']
    },

    //pilih pelajaran
    {
        label: 'pilih',
        isi: `
            Silahkan pilih pelajaran yang ingin dipelajari:
            <br/>
            <br/>
        `,
        menu: [
            {
                judul: 'matematika',
                goto: ['matematika', 'soal-1']
            },
            {
                judul: 'bahasa arab',
                goto: ['kosong', 'pilih']
            }
        ],
    },

    //pelajaran ada, matematika
    {
        label: 'matematika',
        isi: `
            Hari ini kita akan belajar berhitung. <br/>
            Coba selesaikan soal-soal berikut
        `,
        gotoDef: ['soal-1']
    },

    //soal 1
    {
        label: 'soal-1',
        isi: `
            Soal 1. <br/>
            Berapa jumlahnya?<br/>
            1 + 1
        `,
        resp: [
            {
                judul: '2',
                goto: ['benar', 'soal-2']
            }
        ],
        gotoDef: ['soal-1']
    },


    //pelajaran kosong
    {
        label: 'kosong',
        isi: `
            Waaaah, maaf!!. 😥 <br/> 
            Pelajaran tersebut belum tersedia. <br/> 
            Pilih yang lain aja ya
        `
    },

];

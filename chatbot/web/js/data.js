/**
 * data untuk chatbot
 */
const data = [
    //menu utama
    {
        label: 'menu-utama',
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
                judul: 'bahasa indonesia',
                goto: ['kosong', 'pilih']
            },
            {
                judul: 'bahasa arab',
                goto: ['kosong', 'pilih']
            },
        ],
    },
    //benar salah
    {
        label: 'benar',
        isi: `
            Hebat!<br/>
            jawaban kamu benar
        `
    },
    {
        label: 'salah',
        isi: `
            Jawaban kamu salah!<br/>
            Tidak mengapa, jangan menyerah<br/>
        `
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
    //pelajaran ada
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
        gotoDef: ['salah', 'soal-1']
    },
    //soal 2
    {
        label: 'soal-2',
        isi: `
            Soal 2. <br/>
            Berapa jumlahnya?<br/>
            1 + 2
        `,
        resp: [
            {
                judul: '3',
                goto: ['benar', 'soal-3']
            }
        ],
        gotoDef: ['salah', 'soal-2']
    },
    //soal - 3
    {
        label: 'soal-3',
        isi: `
            Soal 3: <br/>
            Berapa jumlahnya?<br/>
            2 + 1
        `,
        resp: [
            {
                judul: '3',
                goto: ['benar', 'selesai', 'pilih']
            }
        ],
        gotoDef: ['salah', 'soal-3']
    },
    //selesai
    {
        label: 'selesai',
        isi: `
            Selamat!<br/>
            Kamu sudah menyelesaikan semua soal.
        `
    },
];

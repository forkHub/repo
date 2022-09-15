const data: IChat[] = [
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

    {
        label: 'pilih',
        isi: `
            Silahkan pilih pelajaran yang ingin dipelajari:
        `,
        menu: [
            {
                judul: 'matematika',
                goto: ['matematika']
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
            Wah, maaf. <br/>
            Pelajaran tersebut belum tersedia. <br/> 
            Pilih yang lain aja ya
        `
    },

    //pelajaran
    {
        label: 'matematika',
        isi: `
            Hari ini kita akan belajar berhitung. <br/>
            Coba selesaikan soal-soal berikut
        `,
        gotoDef: ['soal-1']
    },
    {
        label: 'soal-1',
        isi: `
            Soal 1. <br/>
            Berapa jumlahnya?<br/>
            1 + 1
        `,
        resp: [
            {
                judul: '1',
                goto: ['benar', 'soal-2']
            }
        ],
        gotoDef: ['salah']
    },
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
        gotoDef: ['salah']
    },
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
        gotoDef: ['salah']
    },
    {
        label: 'selesai',
        isi: `
            Selamat!<br/>
            Kamu sudah menyelesaikan semua soal.
        `
    },


];
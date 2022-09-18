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
                judul: 'bahasa arab',
                goto: ['kosong', 'pilih']
            }
        ],
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

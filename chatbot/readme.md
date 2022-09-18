# Tutorial membuat chat bot pembelajaran

## Membuat kontent pertama
Buka folder template. 
Didalamnya ada file data.js. 
Buka file tersebut di editor pilihan Anda.

```
const data = [
    {
        isi: `
            Assalamu'alaikum. <br/>
            Hari ini kita akan belajar bersama. <br/>
            Sebelum mulai, mari kenalan dulu yuk <br/>
            Siapa namamu?
        `
    }
];
```

Ini adalah bentuk paling sederhana dari data. Data ini formatnya JSON.  
Isi dari percakapan ditulis dalam bentuk HTML. 
Anda bisa mencoba aplikasi chatbot dengan membuka file `index.html` di browser.

Coba ketik sesuatu dan kirim.
Chatbot akan merespons dengan kalimat yang sama berulang-ulang.

## Menambahkan default response

Mari kita tambahkan response default.
Saat ini kontek percakapannya adalah Chatbot sedang menanyakan siapa nama user.
Apapun yang diketik oleh user akan jadi nama user tersebut. Kita tidak melakukan pengecekan.
Apapun namanya akan diterima.
Kita akan membuat flownya sesederhana mungkin.
Aplikasi chatbot ini tidak bisa menghandle skenario yang kompleks.
Skenarionya akan bersifat linear dengan sedikit percabangan.

Tambahkan entry baru pada data, sehingga isinya sebagai berikut.

```
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
    },

];
```

Kita menambahkan key baru `gotoDef` pada percakapan pertama. `gotoDef` berisi referensi ke percakapan berikutnya setelah user mengirim sesuatu. 
Kita menggunakan 'gotoDef' sebagai default response. Apapun yang dikirim oleh user kita akan menuju percakapan berikutnya yang direferensikan oleh 'gotoDef'.

Pada contoh di atas, `gotoDef` berisi  ['pilih']. Artinya kita akan menuju percakapan dengan `label` pilih, setelah user mengirim sesuatu.

Pada contoh diatas kita telah menambahkan item percakapan baru. Item ini memiliki `label` 'pilih'. `label` dipakai sebagai referensi bila kita ingin pindah percakapan.
Tiap item percakapan bisa memiliki key 'label' atau tidak sesuai kebutuhan. 'label' hanya dipakai bila kita ingin merefer ke percakapan tersebut.

Refresh browser, dan coba ketik sesuatu. Sekarang Chatbot akan merespons dengan memunculkan percakapan baru. 
Percakapan ini tidak memiliki `gotoDef` dan akan merespons dengan percakan yang sama berulang-ulang.

Anda juga bisa mencoba dengan membuka file index.html pada folder demo_01

## Menambahkan menu pilihan





content
menu
response
default goto

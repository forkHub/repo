"use strict";
var ha;
(function (ha) {
    var cacah;
    (function (cacah) {
        let _sisa = '';
        let _progress = 0;
        function sepuluhSet(target) {
            let hasil = [];
            while (target.length > 0) {
                let char = target.charAt(0);
                let n = parseInt(char);
                target = target.slice(1, target.length);
                for (let i = 0; i < n; i++) {
                    hasil.push(target.length);
                }
            }
            return hasil;
        }
        cacah.sepuluhSet = sepuluhSet;
        function kaliSepuluh(a, b) {
            let bn = parseInt(b);
            if (b == '0')
                return a;
            for (let i = 0; i < bn; i++) {
                a += '0';
            }
            return a;
        }
        cacah.kaliSepuluh = kaliSepuluh;
        async function kali(a, b) {
            let ar = sepuluhSet(b);
            let hasil = '0';
            for (let i = 0; i < ar.length; i++) {
                hasil = tambah(hasil, kaliSepuluh(a, ar[i] + ''));
            }
            return hasil;
        }
        cacah.kali = kali;
        async function kelipatanSepuluhTerdekat(nDibagi, nPembagi) {
            let test = nPembagi;
            let hasil = '';
            if (lebihDari(nPembagi, nDibagi)) {
                return '';
            }
            if (lebihDari(tambah(nPembagi, '10'), nDibagi)) {
                return nPembagi;
            }
            if (nDibagi == nPembagi) {
                return nPembagi;
            }
            while (true) {
                test += '0';
                if (kurangDariSamaDengan(test, nDibagi)) {
                    hasil = test;
                }
                else {
                    return hasil;
                }
            }
        }
        cacah.kelipatanSepuluhTerdekat = kelipatanSepuluhTerdekat;
        /**
         * ns habis dibagi pembagi
         *
         * @param ns
         * @param pembagi
         * @param awal
         * @returns
         */
        async function habisDibagi(ns, pembagi, awal = '0') {
            let angka = '';
            angka = kurangi(ns, awal);
            await bagi(angka, pembagi);
            if (sisa() != '0')
                return false;
            return true;
        }
        cacah.habisDibagi = habisDibagi;
        function sepuluh(ns) {
            if (ns.length < 2)
                return '0';
            return ns.slice(0, ns.length - 1);
        }
        cacah.sepuluh = sepuluh;
        function getProgress() {
            return _progress;
        }
        cacah.getProgress = getProgress;
        function sisa() {
            return _sisa + '';
        }
        cacah.sisa = sisa;
        function padding(s, n) {
            if (s.length >= n)
                return s;
            while (s.length < n) {
                s = '0' + s;
            }
            return s;
        }
        /**
         * n1 kurang dari sama dengan n2
         * @param n1
         * @param n2
         * @returns
         */
        function kurangDariSamaDengan(n1, n2) {
            if (kurangDari(n1, n2))
                return true;
            if (n1 == n2)
                return true;
            return false;
        }
        cacah.kurangDariSamaDengan = kurangDariSamaDengan;
        function lebihDariSamaDengan(n1, n2) {
            if (n1 == n2)
                return true;
            if (kurangDari(n2, n1))
                return true;
            return false;
        }
        cacah.lebihDariSamaDengan = lebihDariSamaDengan;
        /**
         * n1 kurang dari n2
         * @param n1
         * @param n2
         * @returns
         */
        function kurangDari(n1, n2) {
            // console.log('kurang dari', n1, n2);
            if (n1.length < n2.length)
                return true;
            if (n1.length > n2.length)
                return false;
            if (n1 == n2)
                return false;
            for (let i = 0; i < n1.length; i++) {
                let c1 = parseInt(n1.charAt(i));
                let c2 = parseInt(n2.charAt(i));
                if (c1 > c2) {
                    // console.log('lebih dari ', c1, c2);
                    return false;
                }
                else if (c1 < c2) {
                    // console.log('kurang dari ', c1, c2);
                    return true;
                }
                else {
                }
            }
            throw Error('');
        }
        cacah.kurangDari = kurangDari;
        function lebihDari(n1, n2) {
            if (n1 == n2)
                return false;
            if (kurangDari(n2, n1))
                return false;
            return true;
        }
        cacah.lebihDari = lebihDari;
        /**
         *
         * @param n1
         * @param n2
         * @returns
         */
        function tambah(n1, n2) {
            let hasil = '';
            let simpan = 0;
            n1 = padding(n1, n2.length);
            n2 = padding(n2, n1.length);
            // console.log('tambah ' + n1 + '/' + n2);
            for (let i = n1.length - 1; i >= 0; i--) {
                let c1 = n1.charAt(i);
                let c2 = n2.charAt(i);
                let c3 = parseInt(c1) + parseInt(c2);
                //simpan
                c3 += simpan;
                simpan = 0;
                while (c3 >= 10) {
                    simpan++;
                    c3 -= 10;
                }
                hasil = c3 + hasil;
            }
            if (simpan > 0) {
                hasil = simpan + hasil;
            }
            return hasil;
        }
        cacah.tambah = tambah;
        /**
         * pengurangan
         * bila hasilnya minus, yang dikembalikan adalah 0
         * @param n1
         * @param n2
         * @returns
         */
        function kurangi(n1, n2) {
            let hasil = '';
            let pinjam = 0;
            if (kurangDariSamaDengan(n1, n2)) {
                return '0';
            }
            n1 = padding(n1, n2.length);
            n2 = padding(n2, n1.length);
            for (let i = n1.length - 1; i >= 0; i--) {
                let c1 = parseInt(n1.charAt(i));
                let c2 = parseInt(n2.charAt(i));
                let c3 = 0;
                if (pinjam > 0) {
                    c1--;
                }
                pinjam = 0;
                if (c1 < c2) {
                    c1 += 10;
                    pinjam = 1;
                }
                c3 = c1 - c2;
                hasil = c3 + hasil;
            }
            //hapus 0
            while (hasil.charAt(0) == '0') {
                hasil = hasil.slice(1);
            }
            return hasil;
        }
        cacah.kurangi = kurangi;
        // export async function kali(n1: string, n2: string): Promise<string> {
        //     let hasil = '0';
        //     let ctr = '0';
        //     while (kurangDari(ctr, n2)) {
        //         hasil = tambah(hasil, n1);
        //         ctr = tambah(ctr, "1");
        //     }
        //     return hasil;
        // }
        /**
         * pembagian
         * n1 / n2
         *
         * @param n1
         * @param n2
         * @returns
         */
        async function bagi(n1, n2) {
            let hasil = '0';
            _sisa = "0";
            if (n2 == "0") {
                return "0";
            }
            if (n1 == n2) {
                return "1";
            }
            if (n1.length < n2.length) {
                _sisa = n1;
                return "0";
            }
            if (kurangDari(n1, n2)) {
                _sisa = n1;
                return "0";
            }
            while (true) {
                if (kurangDari(n1, n2)) {
                    _sisa = n1;
                    break;
                }
                n1 = kurangi(n1, n2);
                hasil = tambah(hasil, "1");
            }
            return hasil;
        }
        cacah.bagi = bagi;
    })(cacah = ha.cacah || (ha.cacah = {}));
})(ha || (ha = {}));

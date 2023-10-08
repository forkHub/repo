"use strict";
var ha;
(function (ha) {
    var cacah;
    (function (cacah) {
        let _sisa = '';
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
        function kurangDari(n1, n2) {
            n1 = padding(n1, n2.length);
            n2 = padding(n2, n1.length);
            // console.log('kurang dari', n1, n2);
            for (let i = 0; i < n1.length; i++) {
                let c1 = parseInt(n1.charAt(i));
                let c2 = parseInt(n2.charAt(i));
                if (c1 < c2) {
                    // console.log('true', c1, c2);
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        }
        /**
         *
         * @param n1
         * @param n2
         * @returns
         */
        async function tambah(n1, n2) {
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
         * bila hasilnya minus, yang dikembalikan adalah bilangan terkecil
         * yang manggil fungsi harus mengecek manual
         * @param n1
         * @param n2
         * @returns
         */
        async function kurang(n1, n2) {
            let hasil = '';
            let pinjam = 0;
            n1 = padding(n1, n2.length);
            n2 = padding(n2, n1.length);
            if (kurangDari(n1, n2)) {
                return n1;
            }
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
                // console.log(c1, c2, c3);
                hasil = c3 + hasil;
            }
            //hapus 0
            while (hasil.charAt(0) == '0') {
                hasil = hasil.slice(1);
            }
            return hasil;
        }
        cacah.kurang = kurang;
        async function kali(n1, n2) {
            let c2 = parseInt(n2);
            let hasil = '0';
            for (let i = 1; i <= c2; i++) {
                hasil = await tambah(hasil, n1);
            }
            return hasil;
        }
        cacah.kali = kali;
        /**
         * pembagian
         *
         *
         * @param n1
         * @param n2
         * @returns
         */
        async function bagi(n1, n2) {
            let hasil = 0;
            while (true) {
                if (kurangDari(n1, n2)) {
                    _sisa = n1;
                    // console.log('break', n1, n2);
                    break;
                }
                n1 = await kurang(n1, n2);
                hasil++;
                // console.log(n1, hasil);
            }
            return hasil + '';
        }
        cacah.bagi = bagi;
    })(cacah = ha.cacah || (ha.cacah = {}));
})(ha || (ha = {}));
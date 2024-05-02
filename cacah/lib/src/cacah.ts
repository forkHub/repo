namespace ha {
    class Cacah {
        private _sisa = '';

        private padding(s: string, n: number): string {

            if (s.length >= n) return s;
            while (s.length < n) {
                s = '0' + s;
            }

            return s;
        }

        private sepuluhSet(target: string): number[] {
            let hasil: number[] = [];

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

        private kaliSepuluh(a: string, b: string): string {
            let bn = parseInt(b);

            if (b == '0') return a;

            for (let i = 0; i < bn; i++) {
                a += '0';
            }

            return a;
        }

        /**
         * pembagian kecil
         * a / b
         * untuk pembagian kecil kurang dari 10 iterasi
         *  
         * @param a 
         * @param b 
         * @returns 
         */
        private bagiKurangDari10(a: string, b: string): string {
            let hasil = '0';
            this._sisa = "0";

            if (b == "0") {
                throw Error('pembagian dengan 0');
            }

            if (a == b) {
                return "1";
            }

            if (true == this.kurangDari(a, b)) {
                this._sisa = a;
                return "0";
            }

            while (true) {
                if (true == this.kurangDari(a, b)) {
                    this._sisa = a;
                    break;
                }

                a = this.kurangi(a, b);
                hasil = this.tambah(hasil, "1");
            }

            return hasil;
        }

        pangkat(a: string, b: string): string {
            let hasil = a;
            let ctr = '1';

            if (b == '0') return '1';
            if (b == '1') return a;

            while (this.kurangDari(ctr, b)) {
                hasil = this.kali(hasil, a);
                ctr = this.tambah(ctr, "1");
            }

            return hasil;
        }

        kali(a: string, b: string): string {
            let ar = this.sepuluhSet(b);
            let hasil = '0';

            for (let i = 0; i < ar.length; i++) {
                hasil = this.tambah(hasil, this.kaliSepuluh(a, ar[i] + ''));
            }

            return hasil;
        }

        /**
         * a habis dibagi b
         * 
         * @param a 
         * @param b 
         * @param awal 
         * @returns 
         */
        habisDibagi(a: string, b: string): boolean {
            this.bagi(a, b);
            if (this.sisa() != '0') return false;

            return true;
        }

        sisa(): string {
            return this._sisa + '';
        }

        /**
         * n1 kurang dari sama dengan n2
         * @param n1 
         * @param n2 
         * @returns 
         */
        kurangDariSamaDengan(n1: string, n2: string): boolean {
            if (true == this.kurangDari(n1, n2)) return true;
            if (n1 == n2) return true;

            return false;
        }

        lebihDariSamaDengan(n1: string, n2: string): boolean {
            if (n1 == n2) return true;
            if (true == this.kurangDari(n2, n1)) return true;

            return false;
        }

        /**
         * n1 kurang dari n2
         * @param n1 
         * @param n2 
         * @returns 
         */
        kurangDari(n1: string, n2: string): boolean {

            // console.log('kurang dari', n1, n2);

            if (n1.length < n2.length) return true;
            if (n1.length > n2.length) return false;

            if (n1 == n2) return false;

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

        lebihDari(n1: string, n2: string): boolean {
            if (n1 == n2) return false;
            if (true == this.kurangDari(n2, n1)) return false;
            return true;
        }

        /**
         * 
         * @param n1 
         * @param n2 
         * @returns 
         */
        tambah(n1: string, n2: string): string {
            let hasil = '';
            let simpan = 0;

            n1 = this.padding(n1, n2.length);
            n2 = this.padding(n2, n1.length);

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

        /**
         * pengurangan
         * bila hasilnya minus, yang dikembalikan adalah 0
         * @param n1 
         * @param n2 
         * @returns 
         */
        kurangi(n1: string, n2: string): string {
            let hasil = '';
            let pinjam = 0;

            if (this.kurangDariSamaDengan(n1, n2) == true) {
                return '0';
            }


            n1 = this.padding(n1, n2.length);
            n2 = this.padding(n2, n1.length);

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

        /**
         * a dibagi b
         * @param a 
         * @param b 
         * @returns 
         */
        bagi(a: string, b: string): string {
            let hasil = '0';
            let base = '0';
            let ar: number[] = this.sepuluhSet(a);
            this._sisa = "0";

            //pengecekan awal

            //jika b * 10 > a
            //pembagian kecil dilakukan dengan cara biasa
            if (true == this.lebihDariSamaDengan(this.kaliSepuluh(b, "1"), a)) {
                return this.bagiKurangDari10(a, b);
            }

            //pembagian noll menghasilkan error
            if (b == "0") {
                throw Error('pembagian dengan 0');
            }

            if (a == b) {
                return "1";
            }

            //bila a lebih kecil, menghasilkan a
            if (true == this.kurangDari(a, b)) {
                this._sisa = a;
                return "0";
            }

            // console.group('bagi 2');
            // console.log('a ' + a + '/b ' + b);
            // console.log(ar);

            for (let i = 0; i < ar.length; i++) {
                // console.group();

                let item = ar[i] + '';
                let item10 = this.kaliSepuluh("1", item);

                let test = this.kali(b, item10);
                test = this.tambah(test, base);

                if (this.kurangDariSamaDengan(test, a)) {
                    let baseTemp = this.kali(b, item10);

                    base = this.tambah(base, baseTemp);
                    hasil = this.tambah(hasil, item10);
                }
                else {
                    //skip
                }

                // console.groupEnd();
            }

            //pembagian sisa

            let sisa2 = this.kurangi(a, base);

            if (sisa2 != '0') {
                let hasil2: string = this.bagiKurangDari10(sisa2, b);

                let base2: string = this.kali(hasil2, b);
                base = this.tambah(base, base2);
                this._sisa = this.kurangi(a, base);

                hasil = this.tambah(hasil, hasil2);
                // debugger;
            }

            console.groupEnd();

            return hasil;
        }
    }

    export const cacah = new Cacah();
}
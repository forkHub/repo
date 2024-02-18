namespace ha.cacah {
    let _sisa = '';
    let idx = 0;
    let _progress = 0;
    let _callback: () => void = () => { };

    export function getProgress() {
        return _progress;
    }

    export function setProgress(f: () => void) {
        _callback = f;
    }

    export function sisa(): string {
        return _sisa + '';
    }

    function padding(s: string, n: number): string {

        if (s.length >= n) return s;
        while (s.length < n) {
            s = '0' + s;
        }

        return s;
    }

    export function kurangDariSamaDengan(n1: string, n2: string): boolean {
        if (kurangDari(n1, n2)) return true;
        if (n1 == n2) return true;

        return false;
    }

    export function lebihDariSamaDengan(n1: string, n2: string): boolean {
        if (n1 == n2) return true;
        if (kurangDari(n2, n1)) return true;

        return false;
    }

    export function kurangDari(n1: string, n2: string): boolean {

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

    export function lebihDari(n1: string, n2: string): boolean {
        if (n1 == n2) return false;
        if (kurangDari(n2, n1)) return false;
        return true;
    }

    /**
     * 
     * @param n1 
     * @param n2 
     * @returns 
     */
    export function tambah(n1: string, n2: string): string {
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

    /**
     * pengurangan
     * bila hasilnya minus, yang dikembalikan adalah 0
     * @param n1 
     * @param n2 
     * @returns 
     */
    export function kurangi(n1: string, n2: string): string {
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

    export async function kali(n1: string, n2: string): Promise<string> {
        let hasil = '0';
        let ctr = '0';

        while (kurangDari(ctr, n2)) {
            hasil = tambah(hasil, n1);
            ctr = tambah(ctr, "1");
        }

        return hasil;
    }

    /**
     * pembagian
     *  
     *  
     * @param n1 
     * @param n2 
     * @returns 
     */
    export async function bagi(n1: string, n2: string): Promise<string> {
        let hasil = '0';
        _sisa = "0";

        // console.log("bagi n1 " + n1 + "/n2 " + n2);

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

}
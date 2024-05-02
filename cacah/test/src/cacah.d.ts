declare namespace ha {
    class Cacah {
        private _sisa;
        private padding;
        private sepuluhSet;
        private kaliSepuluh;
        /**
         * pembagian kecil
         * a / b
         * untuk pembagian kecil kurang dari 10 iterasi
         *
         * @param a
         * @param b
         * @returns
         */
        private bagiKurangDari10;
        pangkat(a: string, b: string): string;
        kali(a: string, b: string): string;
        /**
         * a habis dibagi b
         *
         * @param a
         * @param b
         * @param awal
         * @returns
         */
        habisDibagi(a: string, b: string): boolean;
        sisa(): string;
        /**
         * n1 kurang dari sama dengan n2
         * @param n1
         * @param n2
         * @returns
         */
        kurangDariSamaDengan(n1: string, n2: string): boolean;
        lebihDariSamaDengan(n1: string, n2: string): boolean;
        /**
         * n1 kurang dari n2
         * @param n1
         * @param n2
         * @returns
         */
        kurangDari(n1: string, n2: string): boolean;
        lebihDari(n1: string, n2: string): boolean;
        /**
         *
         * @param n1
         * @param n2
         * @returns
         */
        tambah(n1: string, n2: string): string;
        /**
         * pengurangan
         * bila hasilnya minus, yang dikembalikan adalah 0
         * @param n1
         * @param n2
         * @returns
         */
        kurangi(n1: string, n2: string): string;
        /**
         * a dibagi b
         * @param a
         * @param b
         * @returns
         */
        bagi(a: string, b: string): string;
    }
    export const cacah: Cacah;
    export {};
}

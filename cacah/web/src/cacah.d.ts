declare namespace ha.cacah {
    function sepuluhSet(target: string): number[];
    function kaliSepuluh(a: string, b: string): string;
    function kali(a: string, b: string): Promise<string>;
    function kelipatanSepuluhTerdekat(nDibagi: string, nPembagi: string): Promise<string>;
    /**
     * ns habis dibagi pembagi
     *
     * @param ns
     * @param pembagi
     * @param awal
     * @returns
     */
    function habisDibagi(ns: string, pembagi: string, awal?: string): Promise<boolean>;
    function sepuluh(ns: string): string;
    function getProgress(): number;
    function sisa(): string;
    /**
     * n1 kurang dari sama dengan n2
     * @param n1
     * @param n2
     * @returns
     */
    function kurangDariSamaDengan(n1: string, n2: string): boolean;
    function lebihDariSamaDengan(n1: string, n2: string): boolean;
    /**
     * n1 kurang dari n2
     * @param n1
     * @param n2
     * @returns
     */
    function kurangDari(n1: string, n2: string): boolean;
    function lebihDari(n1: string, n2: string): boolean;
    /**
     *
     * @param n1
     * @param n2
     * @returns
     */
    function tambah(n1: string, n2: string): string;
    /**
     * pengurangan
     * bila hasilnya minus, yang dikembalikan adalah 0
     * @param n1
     * @param n2
     * @returns
     */
    function kurangi(n1: string, n2: string): string;
    /**
     * pembagian
     * n1 / n2
     *
     * @param n1
     * @param n2
     * @returns
     */
    function bagi(n1: string, n2: string): Promise<string>;
}

declare namespace ha.cacah {
    function sisa(): string;
    function kurangDariSamaDengan(n1: string, n2: string): boolean;
    function lebihDariSamaDengan(n1: string, n2: string): boolean;
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
    function kali(n1: string, n2: string): Promise<string>;
    /**
     * pembagian
     *
     *
     * @param n1
     * @param n2
     * @returns
     */
    function bagi(n1: string, n2: string): Promise<string>;
}

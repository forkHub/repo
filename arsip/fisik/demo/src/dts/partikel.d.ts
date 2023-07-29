declare namespace ha.partikel {
    class KonfigurasiItem {
        kecepatan: number;
        kecMaks: number;
        percepatan: number;
        kecepatanAlpha: number;
        percepatanAlpha: number;
        alphaAwal: number;
        umurMaks: number;
    }
    class PartikelObj {
        aktif: boolean;
        x: number;
        y: number;
        konf: KonfigurasiItem;
        sudut: number;
        alpha: number;
        umur: number;
        update(): void;
    }
    export class Partikel {
        private readonly list;
        private readonly konfItem;
        private readonly konfPabrik;
        private readonly pabrik;
        constructor();
        items(): PartikelObj[];
        private buat;
        update(): void;
    }
    export {};
}
//# sourceMappingURL=partikel.d.ts.map
declare namespace ha.tw {
    /**
     *
     */
    class Frame {
        private _posisi;
        private _nilai;
        private _mode;
        /**
         *
         * @param posisi (number) posisi frame
         * @param nilai  (number) nilai pada posisi
         * @param mode  (number) 0 = normal, 1 = semakin cepat, 2 = semakin lambat
         */
        constructor(posisi?: number, nilai?: number, mode?: number);
        get mode(): number;
        set mode(value: number);
        get nilai(): number;
        set nilai(value: number);
        get posisi(): number;
        set posisi(value: number);
    }
    /**
     *
     */
    class TweenObj {
        private _frameList;
        private _pos;
        constructor();
        tambahFrame(fr: Frame): void;
        /**
         * cari frame yang posisinya mendekati pos
         * @param pos (number) posisi frame
         * @returns frame
         */
        private framePadaPosSeb;
        /**
         *
         * @param pos
         * @returns
         */
        private framePadaPosSetelah;
        /**
         * nilai pada posisi
         * @param pos
         * @returns
         */
        nilai(pos: number): number;
        get pos(): number;
        set pos(value: number);
    }
    class Tween {
        /**
         *
         * @param mulai angka awal
         * @param akhir angka akhir
         * @param idx index, mulai .. akhir
         * @param mode
         * @returns
         */
        tweenC(mulai: number, akhir: number, idx: number, mode: number): number;
        /**
         *
         * @param idx
         * @param mode
         * @returns
         */
        tweenB(target: number, idx: number, mode: number): number;
        /**
         *
         * @param idx
         * @param mode 0,1,2 = biasa, semakin cepat, melambat
         * @returns
         */
        tween(idx: number, mode: number): number;
    }
    const tween: Tween;
}

declare namespace ha.tw {
    /**
     *
     */
    export class Frame {
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
    class FrameList {
        private _frames;
        get frames(): Frame[];
        checkKeyFrame(pos: number): boolean;
        urut(): void;
        tukar(f1: number, f2: number): void;
        tambah(): void;
        hapus(id: number): void;
        bacaByIdx(idx: number): Frame;
        bacaByPos(pos: number): Frame;
        get jml(): number;
    }
    /**
     *
     */
    export class TweenObj {
        readonly frameList: FrameList;
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
         * nilai pada posisi sekarang dihitung dari posisi sebelumnya
         * @param pos
         * @returns
         */
        nilai(pos: number): number;
        get pos(): number;
        set pos(value: number);
    }
    export class Tween {
        tweenBC(awal: number, target: number, idx: number, idxAwal: number, idxAkhir: number, mode: number): number;
        /**
         *
         * @param awal
         * @param target
         * @param idx 0 .. idMak
         * @param idxMak 0 .. idxMak
         * @param mode
         * @returns
         */
        tweenBB(awal: number, target: number, idx: number, idxMak: number, mode: number): number;
        /**
         *
         * @param awal
         * @param target
         * @param idx 0 .. 1
         * @param mode
         * @returns
         */
        tweenBA(awal: number, target: number, idx: number, mode: number): number;
        /**
         * dari 0 ke target
         * @param target
         * @param idx 0 .. 1
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
    export const tween: Tween;
    export {};
}

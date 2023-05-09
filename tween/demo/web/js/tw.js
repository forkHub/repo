var ha;
(function (ha) {
    var tw;
    (function (tw) {
        /**
         *
         */
        class Frame {
            /**
             *
             * @param posisi (number) posisi frame
             * @param nilai  (number) nilai pada posisi
             * @param mode  (number) 0 = normal, 1 = semakin cepat, 2 = semakin lambat
             */
            constructor(posisi = 0, nilai = 0, mode = 0) {
                this._posisi = 0;
                this._nilai = 0;
                this._mode = 0;
                this._posisi = posisi;
                this._nilai = nilai;
                this._mode = mode;
            }
            get mode() {
                return this._mode;
            }
            set mode(value) {
                this._mode = value;
            }
            get nilai() {
                return this._nilai;
            }
            set nilai(value) {
                this._nilai = value;
            }
            get posisi() {
                return this._posisi;
            }
            set posisi(value) {
                this._posisi = value;
            }
        }
        tw.Frame = Frame;
        /**
         *
         */
        class FrameList {
            constructor() {
                this._frames = [];
            }
            get frames() {
                return this._frames;
            }
            urut() {
                for (let i = 0; i < this._frames.length; i++) {
                    for (let j = i + 1; j < this._frames.length; j++) {
                        let framei = this._frames[i];
                        let framej = this._frames[j];
                        if (framei.posisi > framej.posisi) {
                        }
                    }
                }
            }
            tukar(f1, f2) {
                let c = this._frames[f1];
                this._frames[f1] = this._frames[f2];
                this._frames[f2] = c;
            }
            tambah() {
            }
            hapus(id) {
                id;
            }
            baca(id) {
                return this._frames[id];
            }
            get jml() {
                return this._frames.length;
            }
        }
        /**
         *
         */
        class TweenObj {
            constructor() {
                this._frameList = new FrameList();
                this._pos = 0;
                this._frameList.frames.push(new Frame());
            }
            tambahFrame(fr) {
                this._frameList.frames.push(fr);
                this._frameList.urut();
            }
            /**
             * cari frame yang posisinya mendekati pos
             * @param pos (number) posisi frame
             * @returns frame
             */
            framePadaPosSeb(pos) {
                let hasil;
                for (let i = 0; i < this._frameList.jml; i++) {
                    let fr = this._frameList.baca(i);
                    if (fr.posisi < pos)
                        hasil = fr;
                }
                return hasil;
            }
            /**
             *
             * @param pos
             * @returns
             */
            framePadaPosSetelah(pos) {
                for (let i = 0; i < this._frameList.jml; i++) {
                    let fr = this._frameList.baca(i);
                    if (fr.posisi >= pos)
                        return fr;
                }
                return null;
            }
            /**
             * nilai pada posisi
             * @param pos
             * @returns
             */
            nilai(pos) {
                let f = this.framePadaPosSeb(pos);
                let f2 = this.framePadaPosSetelah(pos);
                return tw.tween.tweenC(f.posisi, f2.posisi, pos, f.mode);
            }
            get pos() {
                return this._pos;
            }
            set pos(value) {
                this._pos = value;
            }
        }
        tw.TweenObj = TweenObj;
        class Tween {
            /**
             *
             * @param mulai angka awal
             * @param akhir angka akhir
             * @param idx index, mulai .. akhir
             * @param mode
             * @returns
             */
            tweenC(mulai, akhir, idx, mode) {
                let jrk = akhir - mulai + 1;
                let idx2 = idx - mulai;
                return this.tween(idx2 / jrk, mode);
            }
            /**
             *
             * @param idx
             * @param mode
             * @returns
             */
            tweenB(target, idx, mode) {
                return this.tween(idx / target, mode);
            }
            /**
             *
             * @param idx
             * @param mode 0,1,2 = biasa, semakin cepat, melambat
             * @returns
             */
            tween(idx, mode) {
                if ((idx < 0) || (idx > 1))
                    throw Error('idx should be 0 .. 1');
                if (0 == mode) {
                    return idx;
                }
                else if (1 == mode) {
                    return idx * idx;
                }
                else if (2 == mode) {
                    return idx * (2 - idx);
                }
                else {
                    throw Error('invalid mode (0, 1, 2)');
                }
            }
        }
        tw.Tween = Tween;
        tw.tween = new Tween();
    })(tw = ha.tw || (ha.tw = {}));
})(ha || (ha = {}));

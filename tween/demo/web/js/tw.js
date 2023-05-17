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
            checkKeyFrame(pos) {
                for (let i = 0; i < this._frames.length; i++) {
                    let frame = this._frames[i];
                    if (frame.posisi == pos)
                        return true;
                }
                return false;
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
            bacaByIdx(idx) {
                let hasil;
                hasil = this._frames[idx];
                if (hasil) {
                    console.log(hasil);
                    return hasil;
                }
                throw Error('idx tidak ketemu, idx ' + idx);
            }
            bacaByPos(pos) {
                let hasil;
                this._frames.forEach((frame) => {
                    console.log(frame.posisi);
                    if (frame.posisi == pos) {
                        hasil = frame;
                    }
                });
                if (!hasil) {
                    console.log(this._frames);
                    throw Error();
                }
                return hasil;
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
                this.frameList = new FrameList();
                this._pos = 0;
                this.frameList.frames.push(new Frame());
            }
            tambahFrame(fr) {
                this.frameList.frames.push(fr);
                this.frameList.urut();
            }
            /**
             * cari frame yang posisinya mendekati pos
             * @param pos (number) posisi frame
             * @returns frame
             */
            framePadaPosSeb(pos) {
                let hasil;
                for (let i = 0; i < this.frameList.jml; i++) {
                    let fr = this.frameList.bacaByIdx(i);
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
                for (let i = 0; i < this.frameList.jml; i++) {
                    let fr = this.frameList.bacaByIdx(i);
                    if (fr.posisi >= pos)
                        return fr;
                }
                return null;
            }
            /**
             * nilai pada posisi sekarang dihitung dari posisi sebelumnya
             * @param pos
             * @returns
             */
            nilai(pos) {
                if (this.frameList.checkKeyFrame(pos)) {
                    return this.frameList.bacaByPos(pos).nilai;
                }
                let f = this.framePadaPosSeb(pos);
                let f2 = this.framePadaPosSetelah(pos);
                return tw.tween.tweenBC(f.nilai, f2.nilai, pos, f.posisi, f2.posisi, f2.mode);
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
            tweenBC(awal, target, idx, idxAwal, idxAkhir, mode) {
                let idxMak2 = idxAkhir - idxAwal;
                idx = idx - idxAwal;
                return this.tweenBB(awal, target, idx, idxMak2, mode);
            }
            /**
             *
             * @param awal
             * @param target
             * @param idx 0 .. idMak
             * @param idxMak 0 .. idxMak
             * @param mode
             * @returns
             */
            tweenBB(awal, target, idx, idxMak, mode) {
                idx = idx / idxMak;
                return this.tweenBA(awal, target, idx, mode);
            }
            /**
             *
             * @param awal
             * @param target
             * @param idx 0 .. 1
             * @param mode
             * @returns
             */
            tweenBA(awal, target, idx, mode) {
                return this.tween(idx, mode) * (target - awal) + awal;
            }
            /**
             * dari 0 ke target
             * @param target
             * @param idx 0 .. 1
             * @param mode
             * @returns
             */
            tweenB(target, idx, mode) {
                return this.tween(idx, mode) * target;
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

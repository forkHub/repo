namespace ha.tw {

	/**
	 * 
	 */
	export class Frame {
		private _posisi: number = 0;
		private _nilai: number = 0;
		private _mode: number = 0;

		/**
		 * 
		 * @param posisi (number) posisi frame
		 * @param nilai  (number) nilai pada posisi
		 * @param mode  (number) 0 = normal, 1 = semakin cepat, 2 = semakin lambat
		 */
		constructor(posisi: number = 0, nilai: number = 0, mode: number = 0) {
			this._posisi = posisi;
			this._nilai = nilai;
			this._mode = mode;
		}

		public get mode(): number {
			return this._mode;
		}
		public set mode(value: number) {
			this._mode = value;
		}

		public get nilai(): number {
			return this._nilai;
		}
		public set nilai(value: number) {
			this._nilai = value;
		}

		public get posisi(): number {
			return this._posisi;
		}
		public set posisi(value: number) {
			this._posisi = value;
		}
	}

	/**
	 * 
	 */
	class FrameList {
		private _frames: Frame[] = [];
		public get frames(): Frame[] {
			return this._frames;
		}

		checkKeyFrame(pos: number): boolean {
			for (let i = 0; i < this._frames.length; i++) {
				let frame = this._frames[i];
				if (frame.posisi == pos) return true;
			}

			return false;
		}

		urut() {
			for (let i: number = 0; i < this._frames.length; i++) {
				for (let j: number = i + 1; j < this._frames.length; j++) {
					let framei: Frame = this._frames[i];
					let framej: Frame = this._frames[j];

					if (framei.posisi > framej.posisi) {

					}
				}
			}
		}

		tukar(f1: number, f2: number): void {
			let c: Frame = this._frames[f1];

			this._frames[f1] = this._frames[f2];
			this._frames[f2] = c;
		}

		tambah() {

		}

		hapus(id: number) {
			id;
		}

		bacaByIdx(idx: number): Frame {
			let hasil: Frame;

			hasil = this._frames[idx];

			if (hasil) {
				console.log(hasil);
				return hasil;
			}

			throw Error('idx tidak ketemu, idx ' + idx);
		}

		bacaByPos(pos: number): Frame {
			let hasil: Frame;

			this._frames.forEach((frame) => {
				console.log(frame.posisi);
				if (frame.posisi == pos) {
					hasil = frame;
				}
			})

			if (!hasil) {
				console.log(this._frames);
				throw Error();
			}

			return hasil;
		}

		get jml(): number {
			return this._frames.length;
		}

	}

	/**
	 * 
	 */
	export class TweenObj {
		readonly frameList: FrameList = new FrameList();
		private _pos: number = 0;

		constructor() {
			this.frameList.frames.push(new Frame())
		}

		tambahFrame(fr: Frame): void {
			this.frameList.frames.push(fr);
			this.frameList.urut();
		}

		/**
		 * cari frame yang posisinya mendekati pos
		 * @param pos (number) posisi frame
		 * @returns frame
		 */
		private framePadaPosSeb(pos: number): Frame {
			let hasil: Frame;

			for (let i: number = 0; i < this.frameList.jml; i++) {
				let fr: Frame = this.frameList.bacaByIdx(i);
				if (fr.posisi < pos) hasil = fr;
			}

			return hasil;
		}

		/**
		 * 
		 * @param pos 
		 * @returns 
		 */
		private framePadaPosSetelah(pos: number): Frame {
			for (let i: number = 0; i < this.frameList.jml; i++) {
				let fr: Frame = this.frameList.bacaByIdx(i);
				if (fr.posisi >= pos) return fr;
			}

			return null;
		}

		/**
		 * nilai pada posisi sekarang dihitung dari posisi sebelumnya
		 * @param pos 
		 * @returns 
		 */
		nilai(pos: number): number {

			if (this.frameList.checkKeyFrame(pos)) {
				return this.frameList.bacaByPos(pos).nilai;
			}

			let f: Frame = this.framePadaPosSeb(pos);
			let f2: Frame = this.framePadaPosSetelah(pos);

			return tween.tweenBC(f.nilai, f2.nilai, pos, f.posisi, f2.posisi, f2.mode);
		}

		public get pos(): number {
			return this._pos;
		}
		public set pos(value: number) {
			this._pos = value;
		}

	}

	export class Tween {

		tweenBC(awal: number, target: number, idx: number, idxAwal: number, idxAkhir: number, mode: number): number {
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
		tweenBB(awal: number, target: number, idx: number, idxMak: number, mode: number): number {
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
		tweenBA(awal: number, target: number, idx: number, mode: number): number {
			return this.tween(idx, mode) * (target - awal) + awal;
		}

		/**
		 * dari 0 ke target
		 * @param target
		 * @param idx 0 .. 1
		 * @param mode 
		 * @returns 
		 */
		tweenB(target: number, idx: number, mode: number): number {
			return this.tween(idx, mode) * target;
		}

		/**
		 * 
		 * @param idx 
		 * @param mode 0,1,2 = biasa, semakin cepat, melambat
		 * @returns 
		 */
		tween(idx: number, mode: number): number {
			if ((idx < 0) || (idx > 1)) throw Error('idx should be 0 .. 1');

			if (0 == mode) {
				return idx;
			}
			else if (1 == mode) {
				return idx * idx
			}
			else if (2 == mode) {
				return idx * (2 - idx)
			}
			else {
				throw Error('invalid mode (0, 1, 2)');
			}

		}
	}
	export const tween: Tween = new Tween();
}
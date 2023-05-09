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

		baca(id: number): Frame {
			return this._frames[id];
		}

		get jml(): number {
			return this._frames.length;
		}

	}

	/**
	 * 
	 */
	export class TweenObj {
		private _frameList: FrameList = new FrameList();
		private _pos: number = 0;

		constructor() {
			this._frameList.frames.push(new Frame())
		}

		tambahFrame(fr: Frame): void {
			this._frameList.frames.push(fr);
			this._frameList.urut();
		}

		/**
		 * cari frame yang posisinya mendekati pos
		 * @param pos (number) posisi frame
		 * @returns frame
		 */
		private framePadaPosSeb(pos: number): Frame {
			let hasil: Frame;

			for (let i: number = 0; i < this._frameList.jml; i++) {
				let fr: Frame = this._frameList.baca(i);
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
			for (let i: number = 0; i < this._frameList.jml; i++) {
				let fr: Frame = this._frameList.baca(i);
				if (fr.posisi >= pos) return fr;
			}

			return null;
		}

		/**
		 * nilai pada posisi
		 * @param pos 
		 * @returns 
		 */
		nilai(pos: number): number {
			let f: Frame = this.framePadaPosSeb(pos);
			let f2: Frame = this.framePadaPosSetelah(pos);
			return tween.tweenC(f.posisi, f2.posisi, pos, f.mode);
		}

		public get pos(): number {
			return this._pos;
		}
		public set pos(value: number) {
			this._pos = value;
		}

	}

	export class Tween {

		/**
		 * 
		 * @param mulai angka awal
		 * @param akhir angka akhir
		 * @param idx index, mulai .. akhir
		 * @param mode 
		 * @returns 
		 */
		tweenC(mulai: number, akhir: number, idx: number, mode: number): number {
			let jrk: number = akhir - mulai + 1;
			let idx2: number = idx - mulai;
			return this.tween(idx2 / jrk, mode);
		}

		/**
		 * 
		 * @param idx 
		 * @param mode 
		 * @returns 
		 */
		tweenB(target: number, idx: number, mode: number): number {
			return this.tween(idx / target, mode);
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
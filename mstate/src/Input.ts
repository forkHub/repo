namespace kanvas {
	export class Input {

		static readonly M_IDLE: string = 'idle';
		static readonly M_PENCET: string = 'pencet';
		static readonly M_GERAK: string = 'gerak';
		static readonly M_DRAG: string = 'drag';
		static readonly M_TAP: string = 'tap';

		private static _mState: string = Input.M_IDLE;

		private static mPencetX: number = 0;
		private static mPencetY: number = 0;
		private static mDragX: number = 0;
		private static mDragY: number = 0;
		private static _clientX: number = 0;
		private static _clientY: number = 0;

		static init(kanvas: HTMLCanvasElement): void {
			kanvas.onpointerdown = (e: PointerEvent) => {
				Input._mState = Input.M_PENCET;
				Input.mPencetX = e.clientX;
				Input.mPencetY = e.clientY;
				Input._clientX = e.clientX;
				Input._clientY = e.clientY;
			}

			kanvas.onpointermove = (e: PointerEvent) => {
				Input._clientX = e.clientX;
				Input._clientY = e.clientY;

				if (Input._mState == Input.M_PENCET) {
					Input.mDragX = e.clientX - Input.mPencetX;
					Input.mDragY = e.clientY - Input.mPencetY;
					let p: number = (Math.abs(Input.mDragX) + Math.abs(Input.mDragY));

					if (p > 5) {
						Input._mState = Input.M_DRAG;
					}
				}
				else if (Input._mState == Input.M_DRAG) {
					Input.mDragX = e.clientX - Input.mPencetX;
					Input.mDragY = e.clientY - Input.mPencetY;
					Input._clientX = e.clientX;
				}
				else if (Input._mState == Input.M_IDLE) {
					Input._mState = Input.M_GERAK;
				}
			}

			kanvas.onpointerleave = () => {
				Input._mState = Input.M_IDLE;
			}

			kanvas.onpointerenter = () => {
				Input._mState = Input.M_IDLE;
			}

			kanvas.onpointerover = () => {

			}

			kanvas.onpointerup = () => {
				if (Input._mState == Input.M_DRAG) {
					Input._mState = Input.M_IDLE;
				}
				else if (Input._mState == Input.M_PENCET) {
					Input._mState = Input.M_TAP;
				}
			}
		}

		public static get state(): string {
			return Input._mState;
		}

		public static get clientX(): number {
			return Input._clientX;
		}
		public static get clientY(): number {
			return Input._clientY;
		}


	}
}
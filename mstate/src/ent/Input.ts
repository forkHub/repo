class Input {

	static readonly M_IDLE: string = 'idle';
	static readonly M_PENCET: string = 'pencet';
	static readonly M_GERAK: string = 'gerak';
	static readonly M_DRAG: string = 'drag';
	static readonly M_TAP: string = 'tap';

	private static _mState: string = Input.M_IDLE;
	private static _onStateChange: () => void;
	private static _onDrag: () => void;
	private static _onTap: () => void;
	private static _onPencet: () => void;

	public static get onPencet(): () => void {
		return Input._onPencet;
	}
	public static set onPencet(value: () => void) {
		Input._onPencet = value;
	}

	public static get onTap(): () => void {
		return Input._onTap;
	}
	public static set onTap(value: () => void) {
		Input._onTap = value;
	}

	public static get onDrag(): () => void {
		return Input._onDrag;
	}
	public static set onDrag(value: () => void) {
		Input._onDrag = value;
	}
	public static get onStateChange(): () => void {
		return Input._onStateChange;
	}
	public static set onStateChange(value: () => void) {
		Input._onStateChange = value;
	}

	private static mPencetX: number = 0;
	private static mPencetY: number = 0;
	private static _mDragX: number = 0;
	private static _mDragY: number = 0;
	private static _clientX: number = 0;
	private static _clientY: number = 0;

	static init(kanvas: HTMLCanvasElement): void {

		kanvas.onpointerdown = (e: PointerEvent) => {
			Input._mState = Input.M_PENCET;
			Input.mPencetX = e.clientX;
			Input.mPencetY = e.clientY;
			Input._clientX = e.clientX;
			Input._clientY = e.clientY;
			setTimeout(() => {
				Input.onPencet();
			}, 0);
		}

		kanvas.onpointermove = (e: PointerEvent) => {
			Input._clientX = e.clientX;
			Input._clientY = e.clientY;

			if (Input._mState == Input.M_PENCET) {
				let dragX: number = e.clientX - Input.mPencetX;
				let dragY: number = e.clientY - Input.mPencetY;
				let p: number = (Math.abs(dragX) + Math.abs(dragY));

				if (p > 5) {
					Input._mState = Input.M_DRAG;
					Input.stateChange();
				}
			}
			else if (Input._mState == Input.M_DRAG) {
				Input._mDragX = e.clientX - Input.mPencetX;
				Input._mDragY = e.clientY - Input.mPencetY;
				Input._clientX = e.clientX;
				if (Input._onDrag) {
					Input._onDrag();
				}
			}
			else if (Input._mState == Input.M_IDLE) {
				Input._mState = Input.M_GERAK;
				Input.stateChange();
			}
			else if (Input._mState == Input.M_TAP) {
				Input._mState = Input.M_GERAK;
				Input.stateChange();
			}
		}

		kanvas.onpointerleave = () => {
			Input._mState = Input.M_IDLE;
			Input.stateChange();
		}

		kanvas.onpointerenter = () => {
			Input._mState = Input.M_IDLE;
			Input.stateChange();
		}

		kanvas.onpointerover = () => {

		}

		kanvas.onpointerup = () => {
			console.log('up');
			if (Input._mState == Input.M_DRAG) {
				Input._mState = Input.M_IDLE;
			}
			else if (Input._mState == Input.M_PENCET) {
				Input._mState = Input.M_TAP;
				if (Input._onTap) {
					Input._onTap();
				}
			}
			Input.stateChange();
		}
	}

	private static stateChange(): void {
		if (this._onStateChange) {
			this._onStateChange();
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

	public static get mDragX(): number {
		return Input._mDragX;
	}
	public static get mDragY(): number {
		return Input._mDragY;
	}



}

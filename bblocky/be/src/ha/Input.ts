//TODO: depecreated
enum EInput {
	TOUCH = 'touch',
	MOUSE = 'mouse',
	KEYB = 'keyb',
	DEF = ''
}

namespace ha.be {
	class EventHandler {

		move(input: IInput, buffer: IGbr, e: PointerEvent): void {
			let pos: any = Input.pos(e.clientX, e.clientY, buffer);
			input.x = pos.x;
			input.y = pos.y;
			input.id = e.pointerId;

			if (input.isDown) {
				input.isDrag = true;
				input.dragJml++;
				input.xDrag = input.x - input.xStart;
				input.yDrag = input.y - input.yStart;
			}


		}

		down(input: IInput, key: string, type: EInput, pos: IV2D): void {

			if (!input.isDown) {
				input.hit++;
			}

			input.xStart = pos.x
			input.yStart = pos.y;
			input.xDrag = 0;
			input.yDrag = 0;
			input.x = pos.x;
			input.y = pos.y;
			input.isDown = true;
			input.isTap = false;
			input.isDrag = false;
			input.key = key;
			input.type = type;
			input.timerStart = Date.now();
		}

		up(input: IInput): void {

			if (input.isDrag) {
				input.dragSelesaiJml++;
			}

			input.isDown = false;
			input.isDrag = false;
			input.timerEnd = Date.now();

			//todo check tap
			let isTap = this.checkTap(input);
			input.isTap = (isTap == '');

			if (input.isTap) {
				if (Input.debug) {
					console.debug('tap ok');
				}
				input.tapJml++;
			}
			else {
				input.upJml++;
				if (Input.debug) {
					console.debug('tap failed');
					console.debug(isTap);
				}
			}
		}

		//check tap
		private checkTap(input: IInput): string {
			if (Math.abs(input.xDrag) > 5) return "drag x " + input.xDrag;
			if (Math.abs(input.yDrag) > 5) return "drag y 	" + input.xDrag;

			let timer = input.timerEnd - input.timerStart;
			if ((timer) > 500) return "timer " + timer;

			return '';
		}

	}

	export class Input {
		private static _inputs: IInput[] = [];	//any input, todo: clean up
		private static _debug: boolean = false;
		public static get debug(): boolean {
			return Input._debug;
		}
		public static set debug(value: boolean) {
			Input._debug = value;
		}

		// private _touchGlobal: IInput;	//global touch
		// private _mouseGlobal: IInput;	//global mouse
		// private _keybGlobal: IInput;	//global keyb
		private static _inputGlobal: IInput;	//global input

		private static _event: EventHandler = new EventHandler();

		constructor() {
			// this._touchGlobal = this.buatInputDefault();
			// this._mouseGlobal = this.buatInputDefault();
			// this._keybGlobal = this.buatInputDefault();

			// this._touchGlobal.type = EInput.TOUCH;
			// this._keybGlobal.type = EInput.KEYB;
			// this._mouseGlobal.type = EInput.MOUSE;
		}

		// static init() {
		// }

		/**
		 * berapa kali tap terjadi sejak pemanggilan terakhir kali
		 * @returns (number)
		 */
		static JmlTap(): number {
			let tap = Input.inputGlobal.tapJml;
			Input.inputGlobal.tapJml = 0;
			return tap;
		}

		/**
		 * berapa kali pointer diangkat  sejak pemanggilan terakhir kali
		 * @returns (number)
		 */
		static JmlUp(): number {
			let up = Input.inputGlobal.upJml;
			Input.inputGlobal.tapJml = 0;
			return up;
		}

		/**
		 * berapa jumlah drag selesai sejak pemanggilan terakhir kali
		 * @returns 
		 */
		static JmlDragSelesai(): number {
			let s = Input.inputGlobal.dragSelesaiJml;
			Input.inputGlobal.dragSelesaiJml = 0;
			return s;
		}

		/**
		 * (depecreated) type input dari event terkhir
		 * @returns (EInput) 
		 */
		static InputType(): EInput {
			return Input.inputGlobal.type;
		}

		/**
		 * berapa kali pointer di tekan sejak terakhir kali perintah dipanggil
		 * @returns (number)
		 */
		static InputHit(): number {
			let hit: number = Input.inputGlobal.hit;
			Input.inputGlobal.hit = 0;

			return hit;
		}

		/**
		 * posisi x awal drag
		 * @returns (number)
		 * 
		 * */
		static InputXAwal(): number {
			return Input.inputGlobal.xStart;
		}

		/**
		 * posisi y awal drag
		 * @returns (number)
		 */
		static InputYAwal(): number {
			return Input.inputGlobal.yStart;
		}

		/**
		 * posisi x pointer
		 * @returns (number)
		 */
		static InputX(): number {
			return Input.inputGlobal.x;
		}

		/**
		 * posisi y pointer
		 * @returns 
		 */
		static InputY(): number {
			return Input.inputGlobal.y;
		}

		/**
		 * berapa jauh pointer digeser sejajar sumbu x
		 * @returns (number)
		 */
		static GeserX(): number {
			return Input.inputGlobal.xDrag
		}

		/**
		 * berapa jauh pointer di drag sejajar sumbu y
		 * @returns (number)
		 */
		static GeserY(): number {
			return Input.inputGlobal.yDrag
		}

		/**
		 * menghapus data input
		 */
		static FlushInput(): void {
			Input.flush();
		}

		/**
		 * berapa kali drag dimulai sejak pemanggilan terakhir
		 * 
		 */
		static JmlDragMulai(): number {
			let hasil = Input.inputGlobal.dragJml;
			Input.inputGlobal.dragJml = 0;

			return hasil;
		}

		/**
		 * mengecek apakah pointer sedang ditekan
		 * @returns (boolean) 
		 */
		static Pencet(): boolean {
			return Input.inputGlobal.isDown;
		}

		/**
		 * mengecheck apakah pointer sedang di drag
		 * @returns (boolean)
		 */
		static Geser(): boolean {
			return Input.inputGlobal.isDrag;
		}

		private static getMouseKeyId(e: PointerEvent): string {
			if (e.pointerType == 'touch') {
				return e.pointerId + '';
			}
			else if (e.pointerType == 'mouse') {
				return e.button + '';
			}

			throw Error('');
		}

		static init(buffer: IGbr): void {
			console.log('input init');

			Input._inputGlobal = this.buatInputDefault();

			buffer.canvas.style.touchAction = 'none';

			buffer.canvas.onpointerdown = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();

				let pos: any = Input.pos(e.clientX, e.clientY, buffer);
				let key: string = Input.getMouseKeyId(e);
				let input: IInput = Input.baru(key, e.pointerType as EInput);

				Input.event.down(input, key, e.pointerType as EInput, pos);
				Input.event.down(this._inputGlobal, key, e.pointerType as EInput, pos);

				// if ("mouse" == e.pointerType) ha.be.input.event.down(this._mouseGlobal, key, EInput.MOUSE, pos);
				// if ("touch" == e.pointerType) ha.be.input.event.down(this._touchGlobal, key, EInput.TOUCH, pos);

				sprInteraksi.inputDown(pos, e.pointerId);
			}

			buffer.canvas.onpointermove = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();

				let pos: any = Input.pos(e.clientX, e.clientY, buffer);
				let key: string = this.getMouseKeyId(e);
				let input: IInput = this.baru(key, e.pointerType as EInput);

				Input.event.move(input, buffer, e);
				Input.event.move(this.inputGlobal, buffer, e);

				// if (e.pointerType == 'touch') ha.be.input.event.move(ha.be.input.touchGlobal, buffer, e);
				// if (e.pointerType == 'mouse') ha.be.input.event.move(ha.be.input.mouseGlobal, buffer, e);

				//sprite
				sprInteraksi.inputMove(pos, e.pointerId);
			}

			buffer.canvas.onpointerout = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();

				// let key: string = Input.getMouseKeyId(e);
				// let input: IInput = Input.baru(key, e.pointerType as EInput);

				// Input.event.up(input);
				// Input.event.up(Input.inputGlobal);

				// if (e.pointerType == 'touch') ha.be.input.event.up(ha.be.input.touchGlobal);
				// if (e.pointerType == 'mouse') ha.be.input.event.up(ha.be.input.mouseGlobal);
			}

			buffer.canvas.onpointercancel = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();
			}

			buffer.canvas.onpointerup = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();

				let key: string = this.getMouseKeyId(e);
				let input: IInput = this.baru(key, e.pointerType as EInput);

				Input.event.up(input);
				Input.event.up(this.inputGlobal);
				// if (e.pointerType == 'touch') ha.be.input.event.up(ha.be.input.touchGlobal);
				// if (e.pointerType == 'mouse') ha.be.input.event.up(ha.be.input.mouseGlobal);

				//sprite up
				//sprite hit
				Spr.daftar.forEach((item: ISpr) => {
					if (e.pointerId == item.inputId) {
						if (item.down) {
							item.jmlHit++;
						}

						item.down = false;
						item.dragged = false;
					}
				});
			}
		}

		private static buatInputDefault(): IInput {
			return {
				id: 0,
				isDown: false,
				isDrag: false,
				// isHit: false,
				isTap: false,
				key: '',
				timerEnd: 0,
				timerStart: 0,
				type: EInput.DEF,
				x: 0,
				xDrag: 0,
				xStart: 0,
				y: 0,
				yDrag: 0,
				yStart: 0,
				hit: 0,
				dragJml: 0,
				dragSelesaiJml: 0,
				tapJml: 0,
				upJml: 0
			}
		}

		// private reset(input: IInput) {
		// 	input.id = 0;
		// 	input.isDown = false;
		// 	input.isDrag = false;
		// 	// input.isHit = false;
		// 	input.isTap = false;
		// 	input.key = '';
		// 	input.timerEnd = 0;
		// 	input.timerStart = 0;
		// 	input.type = EInput.DEF;
		// 	input.x = 0;
		// 	input.y = 0;
		// 	input.xDrag = 0;
		// 	input.yDrag = 0;
		// 	input.xStart = 0;
		// 	input.yStart = 0;
		// }

		private static flush(): void {
			while (Input.inputs.length > 0) {
				Input.inputs.pop();
			}
			Input.flushByInput(Input._inputGlobal);
			// this.flushByInput(this._mouseGlobal);
			// this.flushByInput(this._touchGlobal);
			// this.flushByInput(this._keybGlobal);
		}

		// flushByType(type: string): void {
		// 	this._inputs.forEach((input: IInput) => {
		// 		if (type == input.type) {
		// 			this.flushByInput(input);
		// 		}
		// 	});
		// }

		private static flushByInput(input: IInput): void {
			input.isDown = false;
			input.isDrag = false;
			input.isTap = false;
			input.hit = 0;
			input.tapJml = 0;
			input.dragJml = 0;
			input.dragSelesaiJml = 0;
		}

		private static getInput(key: string, inputType: string): IInput {
			let inputHasil: IInput;

			for (let i: number = 0; i < Input.inputs.length; i++) {
				let input: IInput = Input.inputs[i];
				if (input.type == inputType && input.key == key) {
					inputHasil = input;
					return inputHasil;
				}
			}

			return inputHasil;
		}

		private static baru(keyId: string, inputType: EInput): IInput {
			let input: IInput = Input.getInput(keyId, inputType);

			if (!input) {
				input = {
					key: keyId,
					type: inputType,
					isDown: false,
					isDrag: false,
					isTap: false,
					timerEnd: 0,
					timerStart: 0,
					x: 0,
					xDrag: 0,
					xStart: 0,
					y: 0,
					yDrag: 0,
					yStart: 0,
					id: 0,
					hit: 0,
					dragJml: 0,
					dragSelesaiJml: 0,
					tapJml: 0,
					upJml: 0
				}

				Input.inputs.push(input);
			}

			return input;
		}

		static pos = (cx: number, cy: number, buffer: IGbr) => {
			let rect: DOMRect = buffer.canvas.getBoundingClientRect();

			let canvasScaleX = parseInt(window.getComputedStyle(buffer.canvas).width) / buffer.canvas.width;
			let canvasScaleY = parseInt(window.getComputedStyle(buffer.canvas).height) / buffer.canvas.height;

			let poslx: number = Math.floor((cx - rect.x) / canvasScaleX);
			let posly: number = Math.floor((cy - rect.y) / canvasScaleY);

			return {
				x: poslx,
				y: posly
			}
		}

		public static get inputs(): IInput[] {
			return Input._inputs;
		}

		public static get event(): EventHandler {
			return Input._event;
		}

		// public get touchGlobal(): IInput {
		// 	return this._touchGlobal;
		// }

		// public get mouseGlobal(): IInput {
		// 	return this._mouseGlobal;
		// }

		// public get keybGlobal(): IInput {
		// 	return this._keybGlobal;
		// }

		public static get inputGlobal(): IInput {
			return Input._inputGlobal;
		}

	}



	// export const input: Input = new Input();
}


// Input
//======
// KeyDown
// KeyHit
// GetKey
// WaitKey
// FlushKeys

// MoveMouse
// MouseDown
// MouseHit
// GetMouse
// WaitMouse
// MouseX
// MouseY
// MouseZ
// MouseXSpeed
// MouseYSpeed
// MouseZSpeed
// FlushMouse

// JoyType
// JoyDown
// JoyHit
// GetJoy
// WaitJoy
// JoyX
// JoyY
// JoyZ
// JoyU
// JoyV
// JoyXDir
// JoyYDir
// JoyZDir
// JoyUDir
// JoyVDir
// JoyYaw
// JoyPitch
// JoyRoll
// JoyHat
// FlushJoy
namespace ha {
	class Input {
		private _inputs: IInput[] = [];	//any input,
		private _touchGlobal: IInput;	//global touch
		private _mouseGlobal: IInput;	//global mouse
		private _keybGlobal: IInput;	//global keyb
		private _inputGlobal: IInput;	//global input
		private _event: Event = new Event();

		constructor() {
			this._touchGlobal = this.def();
			this._mouseGlobal = this.def();
			this._keybGlobal = this.def();
			this._inputGlobal = this.def();

			this._touchGlobal.type = 'touch';
			this._keybGlobal.type = 'keyb';
			this._mouseGlobal.type = 'mouse';
		}

		getMouseKey(e: PointerEvent): string {
			if (e.pointerType == 'touch') {
				return e.pointerId + '';
			}
			else if (e.pointerType == 'mouse') {
				return e.button + '';
			}

			throw Error('');
		}

		//TODO: diganti canvas dan info yang lebih bagus
		init(buffer: IBuffer): void {

			buffer.canvas.onpointerdown = (e: PointerEvent) => {
				e.stopPropagation();
				// e.preventDefault();

				let pos: any = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);
				let key: string = this.getMouseKey(e);
				let input: IInput = ha.input.baru(key, e.pointerType);

				ha.input.event.down(input, key, e.pointerType, pos);
				ha.input.event.down(this._inputGlobal, key, e.pointerType, pos);
				if ("mouse" == e.pointerType) ha.input.event.down(this._mouseGlobal, key, 'mouse', pos);
				if ("touch" == e.pointerType) ha.input.event.down(this._touchGlobal, key, 'touch', pos);
			}

			buffer.canvas.onpointermove = (e: PointerEvent) => {
				e.stopPropagation();

				let input: IInput = this.baru(e.button + '', e.pointerType);

				ha.input.event.move(input, buffer, e);
				ha.input.event.move(this.inputGlobal, buffer, e);
				if (e.pointerType == 'touch') ha.input.event.move(ha.input.touchGlobal, buffer, e);
				if (e.pointerType == 'mouse') ha.input.event.move(ha.input.mouseGlobal, buffer, e);
			}

			buffer.canvas.onpointerout = (e: PointerEvent) => {
				e.stopPropagation();

				let input: IInput = ha.input.baru(e.button + '', e.pointerType);

				ha.input.event.up(input);
				ha.input.event.up(this.inputGlobal);
				if (e.pointerType == 'touch') ha.input.event.up(ha.input.touchGlobal);
				if (e.pointerType == 'mouse') ha.input.event.up(ha.input.mouseGlobal);
			}

			buffer.canvas.onpointercancel = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();
			}

			buffer.canvas.onpointerup = (e: PointerEvent) => {
				e.stopPropagation();

				let input: IInput = ha.input.baru(e.button + '', e.pointerType);

				ha.input.event.up(input);
				ha.input.event.up(this.inputGlobal);
				if (e.pointerType == 'touch') ha.input.event.up(ha.input.touchGlobal);
				if (e.pointerType == 'mouse') ha.input.event.up(ha.input.mouseGlobal);
			}

			window.onkeydown = (e: KeyboardEvent) => {
				// e.stopPropagation();
				// e.preventDefault();

				let input: IInput = ha.input.baru(e.key + '', 'keyb');
				ha.input.event.down(input, e.key, 'keyb', ha.point.create());
				ha.input.event.down(this.inputGlobal, e.key, 'keyb', ha.point.create());
				ha.input.event.down(this._keybGlobal, e.key, 'keyb', ha.point.create());

				// console.log('keydown');
			};

			window.onkeyup = (e: KeyboardEvent) => {
				// e.stopPropagation();

				let input: IInput = ha.input.baru(e.key + '', 'keyb');
				ha.input.event.up(input);
				ha.input.event.up(this.inputGlobal);
				ha.input.event.up(this._keybGlobal);

				// ha.blitz.input.event.keyUp(input, e);
				// ha.blitz.input.event.keyUp(blitzConf.input, e);
			}

			// window.onresize = async (): Promise<void> => {
			// 	ha.blitz.main.windowResize();
			// }
		}

		def(): IInput {
			return {
				id: 0,
				isDown: false,
				isDrag: false,
				// isHit: false,
				isTap: false,
				key: '',
				timerEnd: 0,
				timerStart: 0,
				type: '',
				x: 0,
				xDrag: 0,
				xStart: 0,
				y: 0,
				yDrag: 0,
				yStart: 0,
				hit: 0
			}
		}

		reset(input: IInput) {
			input.id = 0;
			input.isDown = false;
			input.isDrag = false;
			// input.isHit = false;
			input.isTap = false;
			input.key = '';
			input.timerEnd = 0;
			input.timerStart = 0;
			input.type = '';
			input.x = 0;
			input.y = 0;
			input.xDrag = 0;
			input.yDrag = 0;
			input.xStart = 0;
			input.yStart = 0;
		}

		flush(): void {
			while (this.inputs.length > 0) {
				this.inputs.pop();
			}
			this.flushByInput(this._inputGlobal);
			this.flushByInput(this._mouseGlobal);
			this.flushByInput(this._touchGlobal);
			this.flushByInput(this._keybGlobal);
		}

		flushByType(type: string): void {
			this._inputs.forEach((input: IInput) => {
				if (type == input.type) {
					this.flushByInput(input);
				}
			});
		}

		flushByInput(input: IInput): void {
			input.isDown = false;
			input.isDrag = false;
			// input.isHit = false;
			input.isTap = false;
			input.hit = 0;
		}

		getInput(key: string, inputType: string): IInput {
			let inputHasil: IInput;

			for (let i: number = 0; i < this.inputs.length; i++) {
				let input: IInput = this.inputs[i];
				if (input.type == inputType && input.key == key) {
					inputHasil = input;
					return inputHasil;
				}
			}

			return inputHasil;
		}

		baru(e: string, inputType: string): IInput {
			let inputBaru: IInput = this.getInput(e, inputType);

			if (!inputBaru) {
				inputBaru = {
					key: e,
					type: inputType,
					// down: [],
					// hit: [],
					isDown: false,
					isDrag: false,
					// isHit: false,
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
					hit: 0
				}

				this.inputs.push(inputBaru);
				// console.log('new input:');
				// console.log(inputBaru);
			}

			return inputBaru;
		}

		pos = (cx: number, cy: number, buffer: IBuffer, canvasScaleX: number, canvasScaleY: number) => {
			let rect: DOMRect = buffer.canvas.getBoundingClientRect();
			let poslx: number = Math.floor((cx - rect.x) / canvasScaleX);
			let posly: number = Math.floor((cy - rect.y) / canvasScaleY);

			return {
				x: poslx,
				y: posly
			}
		}

		public get inputs(): IInput[] {
			return this._inputs;
		}

		public get event(): Event {
			return this._event;
		}

		public get touchGlobal(): IInput {
			return this._touchGlobal;
		}

		public get mouseGlobal(): IInput {
			return this._mouseGlobal;
		}

		public get keybGlobal(): IInput {
			return this._keybGlobal;
		}

		public get inputGlobal(): IInput {
			return this._inputGlobal;
		}

	}

	class Event {
		move(input: IInput, canvas: IBuffer, e: PointerEvent): void {
			let pos: any = ha.input.pos(e.clientX, e.clientY, canvas, canvas.scaleX, canvas.scaleY);
			input.x = pos.x;
			input.y = pos.y;
			input.id = e.pointerId;

			if (input.isDown) {
				input.isDrag = true;
				input.xDrag = input.x - input.xStart;
				input.yDrag = input.y - input.yStart;
			}
		}

		down(input: IInput, key: string, type: string, pos: IV2D): void {

			if (!input.isDown) {
				input.hit++;
			}

			input.xStart = pos.x
			input.yStart = pos.y;
			input.x = pos.x;
			input.y = pos.y;
			input.isDown = true;
			input.isTap = false;
			input.isDrag = false;
			// input.isHit = true;
			input.key = key;
			input.type = type;
			input.timerStart = Date.now();
		}

		up(input2: IInput): void {
			// input2.id = e.pointerId;
			input2.isDown = false;
			input2.isDrag = false;
			input2.timerEnd = Date.now();
			input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);
		}

		// keyDown(input: IInput, e: KeyboardEvent): void {

		// 	input.key = e.key;
		// 	input.type = 'keyb';
		// 	input.isDown = true;
		// 	input.isDrag = false;
		// 	input.isTap = false;

		// 	//pertama
		// 	if (!e.repeat) {
		// 		input.timerStart = Date.now();
		// 		input.isHit = true;
		// 		input.hit++;
		// 	}
		// 	else {
		// 		// input.hit++;
		// 	}
		// }

		// keyUp(input: IInput, e: KeyboardEvent): void {
		// 	input.isDown = false;
		// 	input.isDrag = false;
		// 	input.isTap = false;
		// 	input.key = e.key;
		// 	input.type = 'keyb';
		// 	input.timerEnd = Date.now();
		// }

	}

	export var input: Input = new Input();
}
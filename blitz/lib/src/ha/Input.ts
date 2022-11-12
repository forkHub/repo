/** INPUT.TS */
namespace ha {
	class Input {
		private _inputs: IInput[] = [];	//any input,

		//data untuk simpan state tiap input type
		//tidak support multiple finger
		private _touchGlobal: IInput;	//global touch
		private _mouseGlobal: IInput;	//global mouse
		private _keybGlobal: IInput;	//global keyb
		private _inputGlobal: IInput;	//global input

		private _event: EventHandler = new EventHandler();

		constructor() {
			this._touchGlobal = this.buatInputDefault();
			this._mouseGlobal = this.buatInputDefault();
			this._keybGlobal = this.buatInputDefault();
			this._inputGlobal = this.buatInputDefault();

			this._touchGlobal.type = 'touch';
			this._keybGlobal.type = 'keyb';
			this._mouseGlobal.type = 'mouse';
		}

		getMouseKeyId(e: PointerEvent): string {
			if (e.pointerType == 'touch') {
				return e.pointerId + '';
			}
			else if (e.pointerType == 'mouse') {
				return e.button + '';
			}

			throw Error('');
		}

		init(buffer: IBuffer): void {
			console.log('input init');
			console.log('buffer');
			console.log(buffer);

			buffer.canvas.onpointerdown = (e: PointerEvent) => {
				e.stopPropagation();
				// e.preventDefault();

				let pos: any = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);
				let key: string = this.getMouseKeyId(e);
				let input: IInput = ha.input.baru(key, e.pointerType);

				ha.input.event.down(input, key, e.pointerType, pos);
				ha.input.event.down(this._inputGlobal, key, e.pointerType, pos);

				if ("mouse" == e.pointerType) ha.input.event.down(this._mouseGlobal, key, 'mouse', pos);
				if ("touch" == e.pointerType) ha.input.event.down(this._touchGlobal, key, 'touch', pos);

				//sprite down
				ha_blitz.Sprite.daftar.forEach((item: ha_blitz.ISprite) => {
					item.down = false;

					console.log('item down');

					if (ImageDotCollide(item.buffer, item.x, item.y, pos.x, pos.y)) {
						item.down = true;
						item.dragStartX = pos.x - item.x;
						item.dragStartY = pos.y - item.y

						console.log('item drag start');
						console.log(item);
					}

				});
			}

			buffer.canvas.onpointermove = (e: PointerEvent) => {
				e.stopPropagation();

				let input: IInput = this.baru(e.button + '', e.pointerType);

				ha.input.event.move(input, buffer, e);
				ha.input.event.move(this.inputGlobal, buffer, e);
				if (e.pointerType == 'touch') ha.input.event.move(ha.input.touchGlobal, buffer, e);
				if (e.pointerType == 'mouse') ha.input.event.move(ha.input.mouseGlobal, buffer, e);

				//sprite	
				//sprite move
				ha_blitz.Sprite.daftar.forEach((item: ha_blitz.ISprite) => {
					let pos: any = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);

					if (item.down && item.dragable) {
						item.dragged = true;
						item.x = pos.x - item.dragStartX
						item.y = pos.y - item.dragStartY
					}
				});

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

				console.log('on pointer up');

				let input: IInput = ha.input.baru(e.button + '', e.pointerType);

				ha.input.event.up(input);
				ha.input.event.up(this.inputGlobal);
				if (e.pointerType == 'touch') ha.input.event.up(ha.input.touchGlobal);
				if (e.pointerType == 'mouse') ha.input.event.up(ha.input.mouseGlobal);

				//sprite up
				//sprite hit
				ha_blitz.Sprite.daftar.forEach((item: ha_blitz.ISprite) => {
					if (item.down) {
						item.hit++;
					}

					item.down = false;
					item.dragged = false;

					console.log("item drag end");
				});
			}

			window.onkeydown = (e: KeyboardEvent) => {
				// e.stopPropagation();
				// e.preventDefault();

				let input: IInput = ha.input.baru(e.key + '', 'keyb');
				ha.input.event.down(input, e.key, 'keyb', ha.point.create());
				ha.input.event.down(this.inputGlobal, e.key, 'keyb', ha.point.create());
				ha.input.event.down(this._keybGlobal, e.key, 'keyb', ha.point.create());

				console.log('keydown');
			};

			window.onkeyup = (e: KeyboardEvent) => {
				// e.stopPropagation();

				let input: IInput = ha.input.baru(e.key + '', 'keyb');
				ha.input.event.up(input);
				ha.input.event.up(this.inputGlobal);
				ha.input.event.up(this._keybGlobal);
			}
		}

		buatInputDefault(): IInput {
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

		baru(keyId: string, inputType: string): IInput {
			let input: IInput = this.getInput(keyId, inputType);

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
					hit: 0
				}

				this.inputs.push(input);
			}

			return input;
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

		public get event(): EventHandler {
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

	class EventHandler {

		move(input: IInput, buffer: IBuffer, e: PointerEvent): void {
			let pos: any = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);
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

			//TODO: refaktor 
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
			input.key = key;
			input.type = type;
			input.timerStart = Date.now();
		}

		up(input2: IInput): void {
			input2.isDown = false;
			input2.isDrag = false;
			input2.timerEnd = Date.now();
			input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);



		}

	}

	export var input: Input = new Input();
}
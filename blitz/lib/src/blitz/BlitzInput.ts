///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>

/*
 * BLITZ-INPUT.TS
 */

const Prompt = (m: string, def: string): string => {
	let hasil: string = window.prompt(m, def);
	return hasil;
}

const InputHit = (): number => {
	let hit: number = ha.input.inputGlobal.hit;
	ha.input.inputGlobal.hit = 0;

	return hit;
}

const WaitInput = async (): Promise<void> => {
	while (true) {
		if (InputHit() > 0) return;
		Delay(30);
	}
}

const InputX = () => {
	return ha.input.inputGlobal.x;
}

const InputY = () => {
	return ha.input.inputGlobal.y;
}

const InputDragX = (): number => {
	return ha.input.inputGlobal.xDrag
}

const InputDragY = (): number => {
	return ha.input.inputGlobal.yDrag
}

const FlushInput = () => {
	ha.input.flush();
}

const InputDown = (): boolean => {
	return ha.input.inputGlobal.isDown;
}

const InputDrag = (): boolean => {
	return ha.input.inputGlobal.isDrag;
}

/**
 * 	KEYBOARD
 */
const FlushKeys = () => {
	ha.input.flushByInput(ha.input.keybGlobal);
	ha.input.flushByType('keyb');
}

const GetKey = (): string => {
	return ha.input.keybGlobal.key;
}

const KeyIsDown = (key: string = ''): boolean => {
	if ("" == key) {
		return ha.input.keybGlobal.isDown;
	}
	else {
		let input: IInput = ha.input.getInput(key, 'keyb');
		if (input) {
			return input.isDown;
		}

		return false;
	}
}

const KeyHit = (key: string = ''): number => {
	if ("" == key) {
		let n: number = ha.input.keybGlobal.hit;
		ha.input.keybGlobal.hit = 0;
		return (n);
	}
	else {
		let input: IInput = ha.input.getInput(key, 'keyb');
		let n: number = 0;

		if (input) {
			n = input.hit;
			input.hit = 0;
		}

		return n;
	}
}

const WaitKey = async (kode: string = ""): Promise<void> => {
	console.log('wait key: ' + kode);
	let ulang: boolean = true;

	while (ulang) {
		if (KeyHit(kode) > 0) ulang = false;
		await Delay(30);
	}

	console.log('wait key end');
}

/**
 * MOUSE
 */

//Get Mouse Id of the last pressed mouse
const GetMouse = (): number => {
	return parseInt(ha.input.mouseGlobal.key);
}

//how many time mouse is hit
const MouseHit = (button: number = -1): number => {
	if (button == -1) {
		//TODO:
	}
	else {
		//TODO:
	}
	return 0;
}

const MouseDown = (key: string): boolean => {
	key;
	return false;
}

const WaitMouse = () => {

}

const MouseX = (): number => {
	return 0;
}

const MouseY = (): number => {
	return 0;
}

const MouseZ = (): number => {
	return 0;
}

const FlushMouse = () => {

}

//MouseDragX
//MouseDragY
//MouseDragAngle

//MouseUp


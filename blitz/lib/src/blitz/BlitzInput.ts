///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>

/*
 * BLITZ-INPUT.TS
 */

//TODO: promise
const Prompt = (m: string, def: string): string => {
	let hasil: string = window.prompt(m, def);
	return hasil;
}

const InputHit = (): number => {
	let hit: number = ha.input.inputGlobal.hit;
	ha.input.inputGlobal.hit = 0;

	return hit;
}

const TungguInput = async (): Promise<void> => {
	while (true) {
		if (InputHit() > 0) return;
		Jeda(30);
	}
}

const InputX = () => {
	return ha.input.inputGlobal.x;
}

const InputY = () => {
	return ha.input.inputGlobal.y;
}

const InputGeserX = (): number => {
	return ha.input.inputGlobal.xDrag
}

const InputGeserY = (): number => {
	return ha.input.inputGlobal.yDrag
}

const FlushInput = () => {
	ha.input.flush();
}

const Pencet = (): boolean => {
	return ha.input.inputGlobal.isDown;
}

const Geser = (): boolean => {
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

const KeybDiPencet = (key: string = ''): boolean => {
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

const KeybHit = (key: string = ''): number => {
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

const TungguKeyb = async (kode: string = ""): Promise<void> => {
	console.log('wait key: ' + kode);
	let ulang: boolean = true;

	while (ulang) {
		if (KeybHit(kode) > 0) ulang = false;
		await Jeda(30);
	}

	console.log('wait key end');
}

/**
 * MOUSE dihapus
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


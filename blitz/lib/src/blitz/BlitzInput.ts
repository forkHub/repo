///<reference path="./Route.ts"/>

/*
 * BLITZ-INPUT.TS
 */

//TODO: dipindah 
const InputHit = ha.input.InputHit;
const InputX = ha.input.InputX;
const InputY = ha.input.InputY;
const GeserX = ha.input.GeserX;
const GeserY = ha.input.GeserY;
const FlushInput = ha.input.FlushInput;
const Pencet = ha.input.Pencet;
const Geser = ha.input.Geser;

/**
 * 	KEYBOARD (di tunda)
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

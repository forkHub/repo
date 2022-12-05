///<reference path="./Route.ts"/>

/*
 * BLITZ-INPUT.TS
 */

const InputHit = (): number => {
	let hit: number = ha.input.inputGlobal.hit;
	ha.input.inputGlobal.hit = 0;

	return hit;
}

const InputX = () => {
	return ha.input.inputGlobal.x;
}

const InputY = () => {
	return ha.input.inputGlobal.y;
}

const GeserX = (): number => {
	return ha.input.inputGlobal.xDrag
}

const GeserY = (): number => {
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

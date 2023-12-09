///<reference path="./Route.ts"/>

const InputHit = ha.be.Input.InputHit;
const InputX = ha.be.Input.InputX;
const InputY = ha.be.Input.InputY;
const InputXAwal = ha.be.Input.InputXAwal;
const InputYAwal = ha.be.Input.InputYAwal;
const GeserX = ha.be.Input.GeserX;
const GeserY = ha.be.Input.GeserY;
const FlushInput = ha.be.Input.FlushInput;
const Pencet = ha.be.Input.Pencet;
const Geser = ha.be.Input.Geser;
const InputType = ha.be.Input.InputType;
const JmlTap = ha.be.Input.JmlTap;
const JmlDragMulai = ha.be.Input.JmlDragMulai;
const JmlDragSelesai = ha.be.Input.JmlDragSelesai;

// const FlushKeys = () => {
// 	// ha.be.input.flushByInput(ha.be.input.keybGlobal);
// 	ha.be.input.flushByType('keyb');
// }

// const GetKey = (): string => {
// 	return ha.be.input.keybGlobal.key;
// }

// const KeybDiPencet = (key: string = ''): boolean => {
// 	if ("" == key) {
// 		return ha.be.input.keybGlobal.isDown;
// 	}
// 	else {
// 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// 		if (input) {
// 			return input.isDown;
// 		}

// 		return false;
// 	}
// }

// const KeybHit = (key: string = ''): number => {
// 	if ("" == key) {
// 		let n: number = ha.be.input.keybGlobal.hit;
// 		ha.be.input.keybGlobal.hit = 0;
// 		return (n);
// 	}
// 	else {
// 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// 		let n: number = 0;

// 		if (input) {
// 			n = input.hit;
// 			input.hit = 0;
// 		}

// 		return n;
// 	}
// }

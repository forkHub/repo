///<reference path="./Route.ts"/>

const InputHit = ha.be.Input.InputHit;
const InputX = ha.be.Input.InputX;
const InputY = ha.be.Input.InputY;
const InputIsDown = ha.be.Input.Pencet;

// //extended
const FlushInput = ha.be.Input.FlushInput;

const InputDragX = ha.be.Input.GeserX;
const InputDragY = ha.be.Input.GeserY;
const InputIsDragged = ha.be.Input.Geser;
const InputType = ha.be.Input.InputType;
const InputTapCount = ha.be.Input.JmlTap;
const InputDragStartCount = ha.be.Input.JmlDragMulai;
const InputDragEndCount = ha.be.Input.JmlDragSelesai;
const InputDragStartX = ha.be.Input.InputXAwal;
const InputDragStartY = ha.be.Input.InputYAwal;

//TODO: input id


// // const FlushKeys = () => {
// // 	// ha.be.input.flushByInput(ha.be.input.keybGlobal);
// // 	ha.be.input.flushByType('keyb');
// // }

// // const GetKey = (): string => {
// // 	return ha.be.input.keybGlobal.key;
// // }

// // const KeybDiPencet = (key: string = ''): boolean => {
// // 	if ("" == key) {
// // 		return ha.be.input.keybGlobal.isDown;
// // 	}
// // 	else {
// // 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// // 		if (input) {
// // 			return input.isDown;
// // 		}

// // 		return false;
// // 	}
// // }

// // const KeybHit = (key: string = ''): number => {
// // 	if ("" == key) {
// // 		let n: number = ha.be.input.keybGlobal.hit;
// // 		ha.be.input.keybGlobal.hit = 0;
// // 		return (n);
// // 	}
// // 	else {
// // 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// // 		let n: number = 0;

// // 		if (input) {
// // 			n = input.hit;
// // 			input.hit = 0;
// // 		}

// // 		return n;
// // 	}
// // }

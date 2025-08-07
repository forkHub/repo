namespace ha.blockly.InputBlockData {
	export const list: TToolBoxBlockDef[] = [];
	export const group = "Input";
	export const hidden = "false";

	// ha.be.Input.InputHit;
	// InputHit
	list.push({
		type: "ha.be.Input.InputHit",
		perintah: "InputHit",
		message0: "Input Hit count",
		tooltip: `
            Return how many time an input is pressed since the last call.
            Calling this method inside update block will return the count between update.
        `,
		output: EOutput.Number
	})

	// ha.be.Input.InputX;
	list.push({
		type: "ha.be.Input.InputX",
		perintah: "InputX",
		message0: "Input X position",
		tooltip: "return the x position of input",
		output: EOutput.Number
	})

	// ha.be.Input.InputY
	list.push({
		type: "ha.be.Input.InputY",
		perintah: "InputY",
		message0: "Input Y position",
		tooltip: "return the y position of input",
		output: EOutput.Number
	})

	//Input extended
	// ===========

	// ha.be.Input.Pencet
	list.push({
		type: "ha.be.Input.Pencet",
		perintah: "InputIsDown",
		message0: "Input Is Down",
		tooltip: "return true if an input is pressed",
		output: EOutput.Boolean
	})

	// const GeserX = ha.be.Input.GeserX;
	list.push({
		type: "ha.be.Input.GeserX",
		perintah: "InputDragX",
		message0: "Drag X position",
		tooltip: "return drag x position relative to start position",
		output: EOutput.Number
	})

	// const DragY = ha.be.Input.GeserY;
	list.push({
		type: "ha.be.Input.GeserY",
		perintah: "InputDragY",
		message0: "Drag Y position",
		tooltip: "return drag y position relative to start position",
		output: EOutput.Number
	})

	// const IsDragged = ha.be.Input.Geser;
	list.push({
		type: "ha.be.Input.Geser",
		perintah: "InputIsDragged",
		message0: "Input Is Dragged",
		tooltip: "return true if input is dragged",
		output: EOutput.Boolean
	})

	// const InputDragStartX = ha.be.Input.InputXAwal;
	list.push({
		type: "ha.be.Input.InputXAwal",
		perintah: "InputDragStartX",
		message0: "Input Drag Start X",
		tooltip: "Return x position of the initial drag",
		output: EOutput.Number
	})

	// const InputDragStartY = ha.be.Input.InputYAwal;
	list.push({
		type: "ha.be.Input.InputYAwal",
		perintah: "InputDragStartY",
		message0: "Input Drag Start Y",
		tooltip: "Return y position of the initial drag",
		output: EOutput.Number
	})

	// const InputTapCount = ha.be.Input.JmlTap;
	list.push({
		type: "ha.be.Input.JmlTap",
		perintah: "InputTapCount",
		message0: "Input Tap Count",
		tooltip: `
            Return the number of tap happens since last call.
            Calling this method inside update block will return the count between update.
        `,
		output: EOutput.Number
	})

	// const InputDragStartCount = ha.be.Input.JmlDragMulai;
	list.push({
		type: "ha.be.Input.JmlDragMulai",
		perintah: "InputDragStartCount",
		message0: "Input Drag Start Count",
		tooltip: `
            Return the number drag happens since last call.
            Calling this method inside update block will return the count between update.
        `,
		output: EOutput.Number
	})

	// const InputDragEndCount = ha.be.Input.JmlDragSelesai;
	list.push({
		type: "ha.be.Input.JmlDragSelesai",
		perintah: "InputDragEndCount",
		message0: "Input Drag End Count",
		tooltip: `
            Return the number drag ends since last call.
            Calling this method inside update block will return the count between update.
        `,
		output: EOutput.Number
	})

}



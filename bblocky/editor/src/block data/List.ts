namespace ha.blockly.ListDef {
	export const list: TToolBoxBlockDef[] = [];
	export const group = "List 2";
	export const hidden = "false";

	// ha.js.List.push
	list.push({
		type: "ha.js.List.push",
		perintah: "ha.js.List.push",
		message0: "List %1 push %2",
		args: {
			list: {},
			value: {},
		},
		inputsInline: true,

		tooltip: `
            Push value to the end of a list
        `,
	})

	// ha.js.List.pop;
	list.push({
		type: "ha.js.List.pop",
		perintah: "ha.js.List.pop",
		message0: "List %1 pop",
		args: {
			list: {},
		},
		output: EOutput.Any,
		inputsInline: true,

		tooltip: `
            Pop value from the end of a list and return the value
        `,
	})

}
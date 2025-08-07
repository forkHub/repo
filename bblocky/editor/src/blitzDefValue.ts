///<reference path="./toolboxType.ts"/>

/**
 * blitz toolbox definition
 */
namespace ha.blockly.BDef {
	/**
	 * normalize all block
	 */
	export function normalizeAllBlock(list: TBlockRawData[]) {
		// hiddenData.list.forEach((item) => { normal(item); });
		// BlitzData.list.forEach((item) => { normal(item); });
		// ImageBlockData.list.forEach((item) => { normal(item) });
		// ImageBlockData2.list.forEach((item) => { normal(item) });
		// debugData.list.forEach((item) => { normal(item) });
		// InputBlockData.list.forEach((item) => { normal(item) })
		// TextData.list.forEach((item) => { normal(item) })
		// MathBlockData.list.forEach((item) => { normal(item) })

		normalizeAllBlock2(list);
	}

	export function normalizeAllBlock2(list: TBlockRawData[]) {
		list.forEach((item) => {
			item.list.forEach((item) => { normal(item); });
		})

		// hiddenData.list.forEach((item) => { normal(item); });
		// BlitzData.list.forEach((item) => { normal(item); });
		// ImageBlockData.list.forEach((item) => { normal(item) });
		// ImageBlockData2.list.forEach((item) => { normal(item) });
		// debugData.list.forEach((item) => { normal(item) });
		// InputBlockData.list.forEach((item) => { normal(item) })
		// TextData.list.forEach((item) => { normal(item) })
		// MathBlockData.list.forEach((item) => { normal(item) })
	}

	/**
	 * add default value
	 * @param t 
	 */
	function defValue(t: TToolBoxBlockDef): void {
		// console.group("defValue");
		// console.log(t);

		if (t.output != undefined) {

		}
		else {
			t.previousStatement = null;
			t.nextStatement = null;
		}

		if (!(Object as any).hasOwn(t, "inputsInline")) {
			t.inputsInline = false;
		}

		if (t.kurung == undefined) {
			t.kurung = true;
		}

		t.colour = 230;
		t.tooltip = t.tooltip || "";
		t.helpUrl = t.helpUrl || "";

		// if (t.hidden != undefined) {
		//     t.hidden
		// }

		// console.log(t)
		// console.groupEnd();
	}

	/**
	 * create shadow based on input
	 * @param t 
	 * @returns 
	 */
	function createShadow(t: TArgDef): any {
		// console.group('create shadow');
		// console.log(t.check);
		// console.groupEnd();

		if (EOutput.String == t.check) {
			return {
				shadow: {
					"type": "text",
					"fields": {
						"TEXT": t.default
					}
				}
			}
		} else if (EOutput.Number == t.check) {
			return {
				shadow: {
					"type": "math_number",
					"fields": {
						"NUM": t.default
					}
				}
			}
		} else if (EOutput.Boolean == t.check) {
			return {
				shadow: {
					"type": "logic_boolean",
					"fields": {
						"BOOL": t.default
					}
				}
			}
		}
		else if (EOutput.Dummy == t.check) {
			return null
		}
		else if (t.check == undefined) {
			return null
		}

		throw Error('not supported: ' + t.check);
	}

	function addArg(t: TToolBoxBlockDef) {
		// console.group('add arg ');
		// console.log(t);

		function getCheck(n: any): EOutput {
			if (typeof n == "number") return EOutput.Number;
			if (typeof n == "string") return EOutput.String;
			if (typeof n == "boolean") return EOutput.Boolean;
			if (typeof n == "object") return EOutput.Any;
			//TODO: null
			throw Error(n);
		}

		t.args0 = [];
		for (let i in t.args) {
			if ("dummy" == i.toLocaleLowerCase()) {
				t.args0.push({
					type: EArgType.inputDummy
				})
			}
			else if ("any" == i.toLocaleLowerCase()) {
				//TODO:
			}
			else if ("statement" == i.toLocaleLowerCase()) {
				t.args0.push({
					type: EArgType.statementValue,
					name: i + 'st'
				})
			}
			else if (EArgType.input_end_row == i.toLowerCase()) {
				t.args0.push({
					type: EArgType.input_end_row,
				})
				console.log("END ROW");
			}
			else {
				let check = getCheck(t.args[i]);
				// console.log("check:", check);

				if (EOutput.Any == check) {
					// console.log("any");
					t.args0.push({
						type: EArgType.inputValue,
						name: i + ''
					})
				}
				else {
					// console.log("skalar");

					t.args0.push({
						check: check,
						type: EArgType.inputValue,
						default: t.args[i] + '',
						name: i + ''
					})
				}
			}
		}

		// console.groupEnd();
	}

	/**
	 * add default input
	 * @param t 
	 * @returns 
	 */
	function addInput(t: TToolBoxBlockDef) {
		if (t.inputs) return;

		let inputs: any = {}
		t.args0.forEach((item) => {
			if (item.type == EArgType.inputDummy) {

			}
			else if (item.type == EArgType.statementValue) {

			}
			else if (item.type == EArgType.input_end_row) {

			}
			else {
				let shadow = createShadow(item);
				if (shadow != null) {
					inputs[item.name] = shadow;
				}
			}
		})

		t.inputs = inputs;
	}

	function normal(t: TToolBoxBlockDef) {
		defValue(t);
		addArg(t);
		addInput(t);
		if (t.type == "ha.be.Be.Update") {
			console.log(t);
		}
	}

}


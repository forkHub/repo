///<reference path="./toobox.ts"/>

namespace ha.blockly {

	export class Index {

		static init() {
			ha.blockly.toolbox.init();

			//
			Blockly.Msg["VARIABLES_SET"] = "%1 = %2";
			Blockly.Msg["MATH_CHANGE_TITLE"] = "%1 += %2";

			var options = {
				toolbox: ha.blockly.toolbox.toolbox,
				collapse: true,
				comments: true,
				disable: true,
				maxBlocks: Infinity,
				trashcan: true,
				horizontalLayout: true,
				toolboxPosition: 'start',
				css: true,
				media: 'https://blockly-demo.appspot.com/static/media/',
				rtl: false,
				scrollbars: true,
				sounds: true,
				oneBasedIndex: true
			};

			/* Inject your workspace */
			const workspace = Blockly.inject("blocklyDiv", options);
			workspace;

			/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

			/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
			// var workspaceBlocks = document.getElementById("workspaceBlocks");

			/* Load blocks to workspace. */
			// Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

			let w = window as any;
			w.simpan = () => {
				let simpan = Blockly.serialization.workspaces.save(workspace);
				let code = javascript.javascriptGenerator.workspaceToCode(workspace);

				window.localStorage.setItem("blocklytest", JSON.stringify(simpan));
				window.localStorage.setItem("blocklycode", code);

				console.log(simpan);
			}

			w.load = () => {
				let simpan = window.localStorage.getItem("blocklytest");
				let code = JSON.parse(simpan);
				console.log(code);
				Blockly.serialization.workspaces.load(code, workspace);
			}

			w.code = () => {
				let code = javascript.javascriptGenerator.workspaceToCode(workspace);

				// let link = (document.body.querySelector('a.run') as HTMLLinkElement);
				// link.href = '';

				console.log(code);
			}

			w.tambahVar = () => {
				let var1 = prompt('variable baru');
				let simpan: TWorkSpace = Blockly.serialization.workspaces.save(workspace);
				if (!simpan.variables) {
					simpan.variables = [];
				}
				simpan.variables.push({
					id: 'random_id' + Math.floor(Math.random() * 1000),
					name: var1
				});
				Blockly.serialization.workspaces.load(simpan, workspace);
			}

			w.run = () => {
				let code = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(workspace));
				w.simpan();
				window.localStorage.setItem("blocklycode", code);
				window.top.location.href = ('./play.html');
			}

			// console.log(window);
			window.onload = () => {
				// let link = (document.body.querySelector('a.run') as HTMLLinkElement);
				// link.href = '';
				// console.log('test');
				// console.log(w.test);
				// console.log("=================");
			}

			// javascript.javascriptGenerator.forBlock['blitz_graphics'] = function (block: any, generator: any) {
			// 	var value_width = generator.valueToCode(block, 'width', javascript.Order.ATOMIC) || 240;
			// 	var value_height = generator.valueToCode(block, 'height', javascript.Order.ATOMIC) || 320;
			// 	var checkbox_name = block.getFieldValue('fullScreen') === 'TRUE';
			// 	var checkbox_name2 = block.getFieldValue('handleInput') === 'TRUE';

			// 	// TODO: Assemble javascript into code variable.
			// 	var code = `Graphics (${value_width}, ${value_height}, ${checkbox_name}, ${checkbox_name2} )\n`;
			// 	return code;
			// };

			console.log(Blockly);
			// ObjectParser.parse(Blockly);
		}
	}
}






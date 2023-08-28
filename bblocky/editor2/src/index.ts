import { Data } from "./Data";
import { Op } from "./Op";
import { Toolbox } from "./toolbox";
import * as Blockly from 'blockly'

//entry point

export class Index {
	public static workspace: Blockly.WorkspaceSvg;
	public static blocklyArea: HTMLDivElement;
	public static blocklyDiv: HTMLDivElement;

	static initWorkSpace() {
		Blockly.Msg["VARIABLES_SET"] = "%1 = %2";
		Blockly.Msg["MATH_CHANGE_TITLE"] = "%1 += %2";

		var options = {
			toolbox: Toolbox.toolbox,
			collapse: true,
			comments: true,
			disable: true,
			maxBlocks: Infinity,
			trashcan: true,
			horizontalLayout: false,
			toolboxPosition: 'start',
			css: true,
			media: 'https://blockly-demo.appspot.com/static/media/',
			rtl: false,
			scrollbars: true,
			sounds: true,
			oneBasedIndex: true,
			renderer: 'Thrasos'
		};

		Index.workspace = Blockly.inject("blocklyDiv", options);
		Index.blocklyArea = document.body.querySelector('#blocklyArea') as HTMLDivElement;
		Index.blocklyDiv = document.body.querySelector('#blocklyDiv') as HTMLDivElement;
	}

	static getQuery() {
		//TODO:
	}

	static init() {
		Toolbox.init();
		Index.initWorkSpace();
		Op.resize();
		Op.op();

		//load
		try {
			console.group('load file, id ' + Data.data.activeFileId);
			Data.load();
			if (Data.data.activeFileId) {
				let file = Data.getFileById(Data.data.activeFileId);
				// let code = JSON.parse(file.data);
				let code = {};

				if (file.data64) {
					console.log('base 64 tersedia');
					let codeStr = atob(file.data64);
					code = JSON.parse(codeStr);
				}

				console.log("file", file);
				console.log("code", code);
				Blockly.serialization.workspaces.load(code, Index.workspace);
			}
			console.groupEnd();
		}
		catch (e) {
			console.error(e);
		}
	}

	/**
	 * TODO: 
	 * handle event on change
	 * validasi
	 * 
	 */
}

Index.init();






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

		setTimeout(() => {
			Op.handleResize();
		}, 0);
	}

	static getQuery(): boolean {
		let query = location.search.slice(1);
		let queryAr = query.split('&');
		let kvAr: { key: string, value: string }[] = [];
		let ok = false;

		queryAr.forEach((item) => {
			let ar = item.split('=');
			kvAr.push({
				key: ar[0],
				value: ar[1]
			})
		})

		kvAr.forEach((item) => {
			if (item.key == 'share') {
				let value = decodeURIComponent(item.value);
				let code = JSON.parse(value);
				code;
				Blockly.serialization.workspaces.load(code, Index.workspace);
				ok = true;
				Data.data.share = true;
			}
		})

		console.group('get query');
		console.log(query);
		console.log(queryAr);
		console.log(kvAr);
		console.groupEnd();

		return ok;
	}

	static init() {
		Data.data.share = false;
		Toolbox.init();
		Index.initWorkSpace();
		Op.setResize();
		Op.op();
		if (this.getQuery()) return;

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






import { State } from "blockly/core/utils/aria";
import { Data, EEditMode, StateData } from "./Data";
import { Op } from "./Op";
import { Firebase } from "./firebase";
import { Toolbox } from "./toolbox";
import * as Blockly from 'blockly'

//entry point

export class Index {
	public static workspace: Blockly.WorkspaceSvg;
	public static blocklyArea: HTMLDivElement;
	public static blocklyDiv: HTMLDivElement;

	// static isDirty(type: string): boolean {
	// 	if ("drag" == type) return true;
	// 	if ("move" == type) return true;
	// 	if ("create" == type) return true;
	// 	if ("delete" == type) return true;

	// 	return false;
	// }

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
		Index.workspace.addChangeListener((e) => {
			e;
			// console.log(e);
			// if (this.isDirty(e.type)) {
			// this.dirty = true;
			// StateData.dirty = true;
			// }
		})

		// console.log('work space');
		// console.log(Index.workspace.highlightBlock);

		setTimeout(() => {
			Op.handleResize();
		}, 0);
	}

	// static loadFromQueryData(val: string) {
	// 	let value = decodeURIComponent(val);
	// 	let code = JSON.parse(value);
	// 	code;
	// 	Blockly.serialization.workspaces.load(code, Index.workspace);
	// 	Data.data.share = true;

	// }

	static loadFromId(id: string) {

		console.group('load file, id ' + id);
		Data.load();

		if (id) {
			let file = Data.getFileById(id);
			let code = {};

			if (file.data64) {
				console.log('base 64 tersedia');
				let codeStr = atob(file.data64);
				code = JSON.parse(codeStr);
			}
			else if (file.data) {
				code = JSON.parse(file.data);
			}

			console.log("file", file);
			console.log("code", code);
			Blockly.serialization.workspaces.load(code, Index.workspace);

			// Data.data.activeFileId = id;
			StateData.fileId = id;
			setTimeout(() => {
				Op.handleResize();
			}, 0);
		}

		console.groupEnd();

	}

	static getQuery() {
		let query = location.search.slice(1);
		let queryAr = query.split('&');
		let kvAr: { key: string, value: string }[] = [];

		queryAr.forEach((item) => {
			let ar = item.split('=');
			kvAr.push({
				key: ar[0],
				value: ar[1]
			})
		})

		//reset
		StateData.fileId = '';
		StateData.dataAwal = '';
		StateData.dataAkhir = '';
		StateData.editMode = EEditMode.none;

		kvAr.forEach((item) => {
			// if (item.key == 'share') {
			// this.loadFromQueryData(item.value);
			// Data.data.editMode = EEditMode.share;
			// }
			// else 
			if (item.key == EEditMode.id) {
				this.loadFromId(item.value);
				StateData.editMode = EEditMode.id;
				StateData.dataAwal = Op.getB64();
				// Data.data.editMode = EEditMode.id;
			}
			else if (item.key == EEditMode.demo) {
				//TODO:
			}
			else {
				console.warn('item key uknown: ' + item.key);
				console.log('kvar ', kvAr);
			}
		})

		console.group('get query');
		console.log(query);
		console.log(queryAr);
		console.log(kvAr);
		console.groupEnd();
	}

	static init() {
		// Data.data.share = false;
		Toolbox.init();
		Index.initWorkSpace();
		Op.setResize();
		Op.op();
		this.getQuery();
		Firebase.init();

		//load
		// try {
		// 	console.group('load file, id ' + Data.data.activeFileId);
		// 	Data.load();
		// 	if (Data.data.activeFileId) {
		// 		let file = Data.getFileById(Data.data.activeFileId);
		// 		// let code = JSON.parse(file.data);
		// 		let code = {};

		// 		if (file.data64) {
		// 			console.log('base 64 tersedia');
		// 			let codeStr = atob(file.data64);
		// 			code = JSON.parse(codeStr);
		// 		}

		// 		console.log("file", file);
		// 		console.log("code", code);
		// 		Blockly.serialization.workspaces.load(code, Index.workspace);
		// 	}
		// 	console.groupEnd();
		// }
		// catch (e) {
		// 	console.error(e);
		// }

	}

	/**
	 * TODO: 
	 * handle event on change
	 * validasi
	 * 
	 */
}

Index.init();






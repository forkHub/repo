///<reference path="./toobox.ts"/>

namespace ha.blockly {

	export class Index {
		public static workspace: TWorkSpace;
		public static blocklyArea: HTMLDivElement;
		public static blocklyDiv: HTMLDivElement;

		static updateName() {
			let spanNama = document.body.querySelector("span.judul_file");
			if (Store.projectId) {
				spanNama.innerHTML = (Entity.getById(Store.projectId) as IProject).nama
			}
			else {
				spanNama.innerHTML = "untitled";
			}
		}

		static initWorkSpace() {
			Blockly.Msg["VARIABLES_SET"] = "%1 = %2";
			Blockly.Msg["MATH_CHANGE_TITLE"] = "%1 += %2";

			var options = {
				toolbox: ha.blockly.toolbox.toolbox,
				collapse: true,
				comments: true,
				disable: true,
				maxBlocks: Infinity,
				trashcan: true,
				// horizontalLayout: true,
				toolboxPosition: 'start',
				css: true,
				media: 'https://blockly-demo.appspot.com/static/media/',
				rtl: false,
				scrollbars: true,
				sounds: true,
				oneBasedIndex: true
			};

			Index.workspace = Blockly.inject("blocklyDiv", options);
			Index.blocklyArea = document.body.querySelector('#blocklyArea') as HTMLDivElement;
			Index.blocklyDiv = document.body.querySelector('#blocklyDiv') as HTMLDivElement;
		}

		static getQuery() {
			//TODO:
		}

		static init() {
			Store.devMode = false;
			HalListProject.init();
			HalListDemo.init();
			ha.blockly.Entity.init();
			ha.blockly.toolbox.init();
			Index.initWorkSpace();
			Op.resize();
			Op.op();
			try {
				let def = JSON.parse(Store.defWSpace);
				console.log(def);
				Blockly.serialization.workspaces.load(JSON.parse(Store.defWSpace), Index.workspace);

				if (Store.devMode) {

				}
			}
			catch (e) {
				console.error(e);
			}

			this.updateName();
		}
	}
}





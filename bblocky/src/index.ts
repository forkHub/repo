/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
import { toolbox } from "./toobox.js";

var options = {
	toolbox: toolbox,
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
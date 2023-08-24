import { Op } from "./Op";
import { Toolbox } from "./toobox";
export class Index {
    static workspace;
    static blocklyArea;
    static blocklyDiv;
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
            horizontalLayout: true,
            toolboxPosition: 'start',
            css: true,
            media: 'https://blockly-demo.appspot.com/static/media/',
            rtl: false,
            scrollbars: true,
            sounds: true,
            oneBasedIndex: true
        };
        Index.workspace = Blockly.inject("blocklyDiv", options);
        Index.blocklyArea = document.body.querySelector('#blocklyArea');
        Index.blocklyDiv = document.body.querySelector('#blocklyDiv');
    }
    static getQuery() {
        //TODO:
    }
    static init() {
        Toolbox.init();
        Index.initWorkSpace();
        Op.resize();
        Op.op();
    }
}

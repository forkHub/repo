/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: Index

;// CONCATENATED MODULE: ./out/Op.js


class Op_Op {
    static op() {
        let w = window;
        w.simpan = () => {
            let simpan = Blockly.serialization.workspaces.save(Index.workspace);
            let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);
            window.localStorage.setItem("blocklytest", JSON.stringify(simpan));
            window.localStorage.setItem("blocklycode", code);
            console.log(simpan);
        };
        w.load = () => {
            let simpan = window.localStorage.getItem("blocklytest");
            let code = JSON.parse(simpan);
            console.log(code);
            Blockly.serialization.workspaces.load(code, Index.workspace);
        };
        w.code = () => {
            let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);
            console.log(code);
        };
        w.tambahVar = () => {
            let var1 = prompt('variable baru');
            let simpan = Blockly.serialization.workspaces.save(Index.workspace);
            if (!simpan.variables) {
                simpan.variables = [];
            }
            simpan.variables.push({
                id: 'random_id' + Math.floor(Math.random() * 1000),
                name: var1
            });
            Blockly.serialization.workspaces.load(simpan, Index.workspace);
        };
        w.run = () => {
            let code = Export.export(javascript.javascriptGenerator.workspaceToCode(Index.workspace));
            w.simpan();
            window.localStorage.setItem("blocklycode", code);
            window.top.location.href = ('./play.html');
        };
        w.share = () => {
            let simpan = Blockly.serialization.workspaces.save(Index.workspace);
            let simpans = JSON.stringify(simpan);
            let b64 = btoa(simpans);
            console.log(b64);
        };
    }
    static resize() {
        const onresize = function () {
            // Compute the absolute coordinates and dimensions of blocklyArea.
            let element = Index.blocklyArea;
            let x = 0;
            let y = 0;
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
                element = element.offsetParent;
            } while (element);
            // Position blocklyDiv over blocklyArea.
            Index.blocklyDiv.style.left = x + 'px';
            Index.blocklyDiv.style.top = y + 'px';
            Index.blocklyDiv.style.width = Index.blocklyArea.offsetWidth + 'px';
            Index.blocklyDiv.style.height = Index.blocklyArea.offsetHeight + 'px';
            Blockly.svgResize(Index.workspace);
        };
        window.onresize = () => {
            setTimeout(() => {
                onresize();
            }, 100);
        };
        setTimeout(() => {
            onresize();
        }, 100);
    }
}
// function openFile(id: string): void {
//     id;
// }
// function deleteFile(id: string): void {
//     console.group('delete by id: ' + id);
//     ha.blockly.Data.hapus(id);
//     window.location.reload();
// }

;// CONCATENATED MODULE: ./out/block data/blitzData.js
class BlitzData {
    static Grafis = {
        type: "Grafis",
        message0: "Graphics %1 width: %2 height: %3",
        // inputsInline: false,
        args: {
            dummy: '',
            width: 320,
            height: 240
        }
    };
    static list = [];
    static init() {
        this.list.push(this.Grafis);
        // ha.bbjs.General.Graphics full
        this.list.push({
            type: "Grafis_full",
            message0: "Graphics %1 width: %2 height: %3 canvas id: %4 fullScreen: %5 handleInput: %6",
            inputsInline: false,
            args: {
                dummy: '',
                width: 320,
                height: 240,
                canvasId: "canvas_id",
                fullScreen: true,
                handleInput: true
            }
        });
        this.list.push({
            type: "ha.be.Main.Bersih",
            message0: 'Cls',
        });
    }
}
BlitzData.init();

;// CONCATENATED MODULE: ./out/block data/debugData.js
class DebugData {
    static list = [];
    static group = "Debug3";
    static init() {
        this.list.push({
            type: 'ha.bbjs.Debug.Obj',
            message0: "Debug %1 ",
            args: {
                obj: 0
            },
        });
    }
}
DebugData.init();

;// CONCATENATED MODULE: ./out/block data/imgBlockData.js
class ImageBlockData {
    static list = [];
    static blitz_Muat = {
        type: "ha.bbjs.Sprite.LoadSprite",
        message0: 'Load Image %1 url: %2',
        args: {
            dummy: '',
            url: "./imgs/box.png"
        },
        output: EOutput.Number
    };
    static init() {
        this.list.push(this.blitz_Muat);
        //ha.bbjs.Sprite.LoadSprite full
        this.list.push({
            type: 'ha.bbjs.Sprite.LoadSprite_full',
            message0: "Load Image %1 url: %2 drag mode: %3",
            args: {
                dummy: '',
                url: './imgs/box.png',
                dragMode: 1
            },
            output: EOutput.Number
        });
        // ha.bbjs.Sprite.DrawSprite 
        //depecrated
        this.list.push({
            type: "ha.bbjs.Sprite.DrawSprite",
            message0: "Draw %1 image: %2",
            args: {
                dummy: '',
                sprite: 0
            }
        });
    }
}
ImageBlockData.init();

;// CONCATENATED MODULE: ./out/blitzDefValue.js



class BDef {
    static defValue(t) {
        console.group("defValue");
        console.log(t);
        if (t.output) {
        }
        else {
            t.previousStatement = null;
            t.nextStatement = null;
        }
        if (!Object.hasOwn(t, "inputsInline")) {
            t.inputsInline = false;
        }
        t.colour = 230;
        t.tooltip = t.tooltip || "";
        t.helpUrl = t.helpUrl || "";
        console.log(t);
        console.groupEnd();
    }
    static createShadow(t) {
        if (EOutput.String == t.check) {
            return {
                shadow: {
                    "type": "text",
                    "fields": {
                        "TEXT": t.default
                    }
                }
            };
        }
        else if (EOutput.Number == t.check) {
            return {
                shadow: {
                    "type": "math_number",
                    "fields": {
                        "NUM": t.default
                    }
                }
            };
        }
        else if (EOutput.Boolean) {
            return {
                shadow: {
                    "type": "logic_boolean",
                    "fields": {
                        "BOOL": t.default
                    }
                }
            };
        }
        else if (EOutput.Dummy) {
        }
        throw Error('not supported: ' + t.check);
    }
    static addArg(t) {
        function getCheck(n) {
            if (typeof n == "number")
                return EOutput.Number;
            if (typeof n == "string")
                return EOutput.String;
            if (typeof n == "boolean")
                return EOutput.Boolean;
            throw Error(n);
        }
        t.args0 = [];
        for (let i in t.args) {
            if ("dummy" == i.toLocaleLowerCase()) {
                t.args0.push({
                    type: EArgType.inputDummy
                });
            }
            else {
                t.args0.push({
                    check: getCheck(t.args[i]),
                    type: EArgType.inputValue,
                    default: t.args[i] + '',
                    name: i + ''
                });
            }
        }
    }
    static addInput(t) {
        if (t.inputs)
            return;
        let inputs = {};
        t.args0.forEach((item) => {
            if (item.type == EArgType.inputDummy) {
            }
            else {
                inputs[item.name] = this.createShadow(item);
            }
        });
        t.inputs = inputs;
    }
    static normal(t) {
        this.defValue(t);
        this.addArg(t);
        this.addInput(t);
    }
    static normalizeAllBlock() {
        BlitzData.list.forEach((item) => { this.normal(item); });
        ImageBlockData.list.forEach((item) => { this.normal(item); });
        DebugData.list.forEach((item) => { this.normal(item); });
    }
}

;// CONCATENATED MODULE: ./out/toobox.js




class toobox_Toolbox {
    static init() {
        BDef.normalizeAllBlock();
        let allToolBoxDef = this.populateToolBox();
        Blockly.common.defineBlocksWithJsonArray(allToolBoxDef);
        this.toolbox.contents.push(this.getCategory("Blitz", BlitzData.list)); //registerBlitz());
        this.toolbox.contents.push(this.getCategory("Image", ImageBlockData.list));
        this.toolbox.contents.push(this.getCategory(DebugData.group, DebugData.list));
        this.js(allToolBoxDef);
    }
    static getCategory(nama, l) {
        let h = {
            kind: "category",
            name: nama,
            contents: this.getToolBoxContentDef(l)
        };
        return h;
    }
    static getToolBoxContentDef(l) {
        //register blitz content 
        let h = [];
        l.forEach((item) => {
            let def = {
                name: item.type,
                kind: ToolBoxKind.block,
                type: item.type
            };
            if (item.inputs) {
                def.inputs = item.inputs;
            }
            h.push(def);
        });
        return h;
    }
    static populateToolBox() {
        let blockData = [];
        BlitzData.list.forEach((item) => {
            blockData.push(item);
        });
        ImageBlockData.list.forEach((item) => {
            blockData.push(item);
        });
        DebugData.list.forEach((item) => {
            blockData.push(item);
        });
        return blockData;
    }
    static js(blockData) {
        for (let i = 0; i < blockData.length; i++) {
            let itemBlockData = blockData[i];
            console.log('type: ' + itemBlockData.type);
            javascript.javascriptGenerator.forBlock[itemBlockData.type] = (block, generator) => {
                let code = '';
                console.group("");
                code = itemBlockData.type.split('_')[0] + '(';
                itemBlockData.args0.forEach((item, idx) => {
                    if (item.type == EArgType.inputDummy) {
                    }
                    else {
                        let value = generator.valueToCode(block, item.name, javascript.Order.ATOMIC);
                        console.log('value to code >>', "item name:", item.name, "value", value);
                        code += value;
                        if (idx < itemBlockData.args0.length - 1) {
                            code += ',';
                        }
                    }
                });
                code += ')';
                console.log("code", code);
                console.groupEnd();
                if (itemBlockData.output != null) {
                    return [code, Blockly.JavaScript.ORDER_NONE];
                }
                else {
                    return code + ';\n';
                }
            };
        }
    }
    //default toolbox
    static toolbox = {
        kind: ToolBoxKind.categoryToolbox,
        contents: [
            {
                kind: ToolBoxKind.category,
                name: "Logic",
                contents: [
                    {
                        kind: "block",
                        type: "controls_if"
                    },
                    {
                        kind: "block",
                        type: "logic_compare"
                    },
                    {
                        kind: "block",
                        type: "logic_operation"
                    },
                    {
                        kind: "block",
                        type: "logic_negate"
                    },
                    {
                        kind: "block",
                        type: "logic_boolean"
                    },
                    {
                        kind: "block",
                        type: "logic_null"
                    },
                    {
                        kind: "block",
                        type: "logic_ternary"
                    }
                ]
            },
            {
                kind: "category",
                name: "Loops",
                contents: [
                    {
                        kind: "block",
                        type: "controls_repeat_ext"
                    },
                    {
                        kind: "block",
                        type: "controls_whileUntil"
                    }, {
                        kind: "block",
                        type: "controls_for"
                    }, {
                        kind: "block",
                        type: "controls_forEach"
                    }, {
                        kind: "block",
                        type: "controls_flow_statements"
                    },
                ]
            },
            {
                kind: "category",
                name: "Math",
                contents: [
                    {
                        kind: "block",
                        type: "math_number"
                    },
                    {
                        kind: "block",
                        type: "math_arithmetic",
                    },
                    {
                        kind: "block",
                        type: "math_single"
                    },
                    {
                        kind: "block",
                        type: "math_trig"
                    },
                    {
                        kind: "block",
                        type: "math_constant"
                    },
                    {
                        kind: "block",
                        type: "math_number_property"
                    },
                    {
                        kind: "block",
                        type: "math_round"
                    },
                    {
                        kind: "block",
                        type: "math_on_list"
                    },
                    {
                        kind: "block",
                        type: "math_modulo"
                    },
                    {
                        kind: "block",
                        type: "math_constrain"
                    },
                    {
                        kind: "block",
                        type: "math_random_int"
                    },
                    {
                        kind: "block",
                        type: "math_random_float"
                    },
                ]
            },
            {
                kind: "category",
                name: "Text",
                contents: [
                    {
                        kind: "block",
                        type: "text"
                    },
                    {
                        kind: "block",
                        type: "text_join"
                    },
                    {
                        kind: "block",
                        type: "text_append"
                    },
                    {
                        kind: "block",
                        type: "text_length"
                    },
                    {
                        kind: "block",
                        type: "text_isEmpty"
                    },
                    {
                        kind: "block",
                        type: "text_indexOf"
                    },
                    {
                        kind: "block",
                        type: "text_charAt"
                    },
                    {
                        kind: "block",
                        type: "text_getSubstring"
                    },
                    {
                        kind: "block",
                        type: "text_changeCase"
                    },
                    {
                        kind: "block",
                        type: "text_trim"
                    },
                    {
                        kind: "block",
                        type: "text_print"
                    },
                    {
                        kind: "block",
                        type: "text_prompt_ext"
                    },
                ]
            },
            {
                kind: "category",
                name: "Lists",
                contents: [
                    {
                        kind: "block",
                        type: "lists_create_with"
                    },
                    {
                        kind: "block",
                        type: "lists_repeat"
                    },
                    {
                        kind: "block",
                        type: "lists_length"
                    },
                    {
                        kind: "block",
                        type: "lists_isEmpty"
                    },
                    {
                        kind: "block",
                        type: "lists_indexOf"
                    },
                    {
                        kind: "block",
                        type: "lists_getIndex"
                    },
                    {
                        kind: "block",
                        type: "lists_setIndex"
                    },
                    {
                        kind: "block",
                        type: "lists_getSublist"
                    },
                    {
                        kind: "block",
                        type: "lists_split"
                    },
                    {
                        kind: "block",
                        type: "lists_sort"
                    },
                ]
            },
            {
                kind: "category",
                name: "Variables",
                custom: "VARIABLE",
            },
            {
                kind: "category",
                name: "Functions",
                custom: "PROCEDURE"
            }
        ]
    };
}

;// CONCATENATED MODULE: ./out/index.js


class out_Index {
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
        out_Index.workspace = Blockly.inject("blocklyDiv", options);
        out_Index.blocklyArea = document.body.querySelector('#blocklyArea');
        out_Index.blocklyDiv = document.body.querySelector('#blocklyDiv');
    }
    static getQuery() {
        //TODO:
    }
    static init() {
        Toolbox.init();
        out_Index.initWorkSpace();
        Op.resize();
        Op.op();
    }
}

/******/ })()
;
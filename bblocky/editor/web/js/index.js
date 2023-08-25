"use strict";
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Data {
            static loaded = false;
            static db = 'ha.blockly.data';
            static data = {
                files: []
            };
            static load() {
                if (Data.loaded)
                    return;
                try {
                    let str = window.localStorage.getItem(this.db);
                    let obj = JSON.parse(str);
                    Data.data.files = obj;
                    Data.loaded = true;
                    console.log("load:", str);
                    console.log("obj ", obj);
                }
                catch (e) {
                    Data.data.files = [];
                    console.log('load error');
                    console.warn(e);
                    console.log(Data.data.files);
                    console.log(Data);
                }
            }
            static baru(item) {
                this.load();
                this.data.files.push(item);
            }
            static semua() {
                console.log("semua", Data.data);
                this.load();
                console.log("semua", Data.data);
                return Data.data.files;
            }
            static simpan() {
                try {
                    window.localStorage.setItem(this.db, JSON.stringify(this.data.files));
                }
                catch (e) {
                    console.warn(e);
                }
            }
            static hapus(id) {
                for (let i = 0; i < this.data.files.length; i++) {
                    let item = this.data.files[i];
                    if (item.id == id) {
                        console.log('item deleted:", item.id ' + id, "item:", item);
                        this.data.files.slice(i, 1);
                    }
                }
            }
        }
        blockly.Data = Data;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Id {
            static _id = Date.now();
            static get id() {
                this._id++;
                return this._id;
            }
        }
        blockly.Id = Id;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class ObjectParser {
            static parse(obj, depth = 0) {
                depth++;
                console.log('parse obj, d ' + depth);
                if (depth > 2)
                    return;
                for (let i in obj) {
                    console.log(i + '/' + typeof (i));
                    let j = i;
                    if (obj[j] instanceof Object) {
                        ObjectParser.parse(obj[j], depth);
                    }
                }
            }
        }
        blockly.ObjectParser = ObjectParser;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Op {
            static op() {
                let w = window;
                w.simpan = () => {
                    let simpan = Blockly.serialization.workspaces.save(blockly.Index.workspace);
                    let code = javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace);
                    window.localStorage.setItem("blocklytest", JSON.stringify(simpan));
                    window.localStorage.setItem("blocklycode", code);
                    console.log(simpan);
                };
                w.load = () => {
                    let simpan = window.localStorage.getItem("blocklytest");
                    let code = JSON.parse(simpan);
                    console.log(code);
                    Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                };
                w.code = () => {
                    let code = javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace);
                    console.log(code);
                };
                w.tambahVar = () => {
                    let var1 = prompt('variable baru');
                    let simpan = Blockly.serialization.workspaces.save(blockly.Index.workspace);
                    if (!simpan.variables) {
                        simpan.variables = [];
                    }
                    simpan.variables.push({
                        id: 'random_id' + Math.floor(Math.random() * 1000),
                        name: var1
                    });
                    Blockly.serialization.workspaces.load(simpan, blockly.Index.workspace);
                };
                w.run = () => {
                    let code = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace));
                    w.simpan();
                    window.localStorage.setItem("blocklycode", code);
                    window.top.location.href = ('./play.html');
                };
                w.share = () => {
                    let simpan = Blockly.serialization.workspaces.save(blockly.Index.workspace);
                    let simpans = JSON.stringify(simpan);
                    let b64 = btoa(simpans);
                    console.log(b64);
                };
            }
            static resize() {
                const onresize = function () {
                    // Compute the absolute coordinates and dimensions of blocklyArea.
                    let element = blockly.Index.blocklyArea;
                    let x = 0;
                    let y = 0;
                    do {
                        x += element.offsetLeft;
                        y += element.offsetTop;
                        element = element.offsetParent;
                    } while (element);
                    // Position blocklyDiv over blocklyArea.
                    blockly.Index.blocklyDiv.style.left = x + 'px';
                    blockly.Index.blocklyDiv.style.top = y + 'px';
                    blockly.Index.blocklyDiv.style.width = blockly.Index.blocklyArea.offsetWidth + 'px';
                    blockly.Index.blocklyDiv.style.height = blockly.Index.blocklyArea.offsetHeight + 'px';
                    Blockly.svgResize(blockly.Index.workspace);
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
        blockly.Op = Op;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
function openFile(id) {
    id;
}
function deleteFile(id) {
    console.group('delete by id: ' + id);
    ha.blockly.Data.hapus(id);
}
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class WorkSpace {
        }
        blockly.WorkSpace = WorkSpace;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var EOutput;
(function (EOutput) {
    EOutput["Boolean"] = "Boolean";
    EOutput["Number"] = "Number";
    EOutput["String"] = "String";
    EOutput["Array"] = "Array";
    EOutput["Dummy"] = "dummy";
})(EOutput || (EOutput = {}));
var EArgType;
(function (EArgType) {
    EArgType["inputValue"] = "input_value";
    EArgType["inputDummy"] = "input_dummy";
})(EArgType || (EArgType = {}));
var ToolBoxKind;
(function (ToolBoxKind) {
    ToolBoxKind["categoryToolbox"] = "categoryToolbox";
    ToolBoxKind["category"] = "category";
    ToolBoxKind["block"] = "block";
})(ToolBoxKind || (ToolBoxKind = {}));
///<reference path="./toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var BDef;
        (function (BDef) {
            function defValue(t) {
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
            function createShadow(t) {
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
            function addArg(t) {
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
            function addInput(t) {
                if (t.inputs)
                    return;
                let inputs = {};
                t.args0.forEach((item) => {
                    if (item.type == EArgType.inputDummy) {
                    }
                    else {
                        inputs[item.name] = createShadow(item);
                    }
                });
                t.inputs = inputs;
            }
            function normal(t) {
                defValue(t);
                addArg(t);
                addInput(t);
            }
            function normalizeAllBlock() {
                blockly.BlitzData.list.forEach((item) => { normal(item); });
                blockly.ImageBlockData.list.forEach((item) => { normal(item); });
                blockly.debugData.list.forEach((item) => { normal(item); });
            }
            BDef.normalizeAllBlock = normalizeAllBlock;
        })(BDef = blockly.BDef || (blockly.BDef = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Export {
            static data = `
            <!DOCTYPE html>
            <html>

            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,
                    target-densityDpi=device-dpi">
                <title>Blitz Blockly</title>
            </head>

            <body>
                <canvas></canvas>
                <!-- script ref  -->
                <script src="./js/be.js" defer></script>
                <script src="./js/bbjs.js" defer></script>

                <!-- main  -->
                <script>
                    "use strict";
                    window.onload = () => {
                        console.log('start');
                        /** script here **/
                        let __update; // = update || Update || UPDATE as any;
                        if (typeof update === "function")
                            __update = update;
                        if (typeof Update === "function")
                            __update = Update;
                        if (typeof UPDATE === "function")
                            __update = UPDATE;
                        console.log(__update);
                        let __updater = () => {
                            if (__update) {
                                __update();
                            }
                            requestAnimationFrame(__updater);
                        };
                        requestAnimationFrame(__updater);
                    };
                </script>
            </body>

            </html>
        `;
            static export(code) {
                // console.log('code', code);
                // let win = window.open('about:blank', '_blank');
                let data2 = this.data.replace('/** script here **/', code);
                return data2;
                // let iframe = document.body.querySelector('iframe') as HTMLIFrameElement;
                // let doc = iframe.contentWindow.document;
                // doc.open();
                // doc.write(data2);
                // doc.close();
                // console.log('data2', data2);
                // setTimeout(() => {
                //     win.document.open();
                //     win.document.write(data2);
                //     win.document.close();
                //     console.log('writing');
                // }, 100);
                // let link = (document.body.querySelector('a.run') as HTMLLinkElement);
                // link.href = './play.html?code=' +
                //     encodeURIComponent(data2);
                // window.open('data:text/html;charset=utf-8,' +
                //     encodeURIComponent(data2)
                // );
            }
        }
        blockly.Export = Export;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Iframe {
            static init() {
                let simpan = window.localStorage.getItem("blocklycode");
                let iframe = document.querySelector('iframe');
                let doc = iframe.contentWindow.document;
                doc.open();
                doc.write(simpan);
                doc.close();
            }
        }
        blockly.Iframe = Iframe;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="./toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var toolbox;
        (function (toolbox_1) {
            // export function ToolBoxCreateJSDef(t: TBlockDef) {
            //     console.log("test: " + t.type);
            //     javascript.javascriptGenerator.forBlock[t.type] = function (block: any, generator: any) {
            //         let code = '';
            //         code = t.type + '('
            //         t.args0.forEach((item, idx) => {
            //             console.log('item type: ', item.type);
            //             if (item.type == EArgType.inputDummy) {
            //             }
            //             else {
            //                 let value = generator.valueToCode(block, item.name, javascript.Order.ATOMIC);
            //                 console.log('value to code >>', "item name:", item.name, "value", value);
            //                 code += value;
            //                 if (idx < t.args0.length - 1) {
            //                     code += ','
            //                 }
            //             }
            //         });
            //         code += ');\n';
            //         console.log("code", code);
            //         return code;
            //     };
            // }
            function init() {
                blockly.BDef.normalizeAllBlock();
                let allToolBoxDef = populateToolBox();
                Blockly.common.defineBlocksWithJsonArray(allToolBoxDef);
                toolbox_1.toolbox.contents.push(getCategory("Blitz", blockly.BlitzData.list)); //registerBlitz());
                toolbox_1.toolbox.contents.push(getCategory("Image", blockly.ImageBlockData.list));
                toolbox_1.toolbox.contents.push(getCategory(blockly.debugData.group, blockly.debugData.list));
                js(allToolBoxDef);
            }
            toolbox_1.init = init;
            function getCategory(nama, l) {
                let h = {
                    kind: "category",
                    name: nama,
                    contents: getToolBoxContentDef(l)
                };
                return h;
            }
            /*
            function registerImage(): TToolbokContentDef {
                let h: TToolbokContentDef = {
                    kind: "category",
                    name: "Image",
                    contents: getToolBoxContentDef(ImageBlockData.list)
                }
        
                // //register blitz content
                // ImageBlockData.list.forEach((item) => {
                //     let def: TToolbokContentDef = {
                //         name: item.type,
                //         kind: ToolBoxKind.block,
                //         type: item.type
                //     }
                //     if (item.inputs) {
                //         def.inputs = item.inputs
                //     }
        
                //     h.contents.push(def);
                // })
        
                return h;
            }
            */
            function getToolBoxContentDef(l) {
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
            /*
            function registerBlitz(): TToolbokContentDef {
                let blitz: TToolbokContentDef =
                {
                    kind: "category",
                    name: "Blitz",
                    contents: []
                }
        
                //register blitz content
                BlitzData.list.forEach((item) => {
                    let def: TToolbokContentDef = {
                        name: item.type,
                        kind: ToolBoxKind.block,
                        type: item.type
                    }
                    if (item.inputs) {
                        def.inputs = item.inputs
                    }
        
                    blitz.contents.push(def);
                })
        
        
                return blitz;
            }
            */
            function populateToolBox() {
                let blockData = [];
                blockly.BlitzData.list.forEach((item) => {
                    blockData.push(item);
                });
                blockly.ImageBlockData.list.forEach((item) => {
                    blockData.push(item);
                });
                blockly.debugData.list.forEach((item) => {
                    blockData.push(item);
                });
                return blockData;
            }
            function js(blockData) {
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
            // let blockData: TBlockDef[] = [];
            //default toolbox
            toolbox_1.toolbox = {
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
        })(toolbox = blockly.toolbox || (blockly.toolbox = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="./toobox.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Index {
            static workspace;
            static blocklyArea;
            static blocklyDiv;
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
            static init() {
                ha.blockly.toolbox.init();
                Index.initWorkSpace();
                blockly.Op.resize();
                blockly.Op.op();
            }
        }
        blockly.Index = Index;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="../toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var BlitzData;
        (function (BlitzData) {
            BlitzData.Grafis = {
                type: "Grafis",
                message0: "Graphics %1 width: %2 height: %3",
                // inputsInline: false,
                args: {
                    dummy: '',
                    width: 320,
                    height: 240
                }
            };
            BlitzData.list = [];
            BlitzData.list.push(BlitzData.Grafis);
            // ha.bbjs.General.Graphics full
            BlitzData.list.push({
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
            BlitzData.list.push({
                type: "ha.be.Main.Bersih",
                message0: 'Cls',
            });
        })(BlitzData = blockly.BlitzData || (blockly.BlitzData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
//TODO: next butuh alias type, buat backward compatibility
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var debugData;
        (function (debugData) {
            debugData.list = [];
            debugData.group = "Debug3";
            debugData.list.push({
                type: 'ha.bbjs.Debug.Obj',
                message0: "Debug %1 ",
                args: {
                    obj: 0
                },
            });
        })(debugData = blockly.debugData || (blockly.debugData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var ImageBlockData;
        (function (ImageBlockData) {
            ImageBlockData.list = [];
            ImageBlockData.blitz_Muat = {
                type: "ha.bbjs.Sprite.LoadSprite",
                message0: 'Load Image %1 url: %2',
                args: {
                    dummy: '',
                    url: "./imgs/box.png"
                },
                output: EOutput.Number
            };
            ImageBlockData.list.push(ImageBlockData.blitz_Muat);
            //ha.bbjs.Sprite.LoadSprite full
            ImageBlockData.list.push({
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
            ImageBlockData.list.push({
                type: "ha.bbjs.Sprite.DrawSprite",
                message0: "Draw %1 image: %2",
                args: {
                    dummy: '',
                    sprite: 0
                }
            });
        })(ImageBlockData = blockly.ImageBlockData || (blockly.ImageBlockData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class HalProject {
            static list(cont) {
                //get data;
                let hasil = '';
                console.log(blockly.Data.semua());
                blockly.Data.semua().forEach((item) => {
                    hasil += (`<div>
                        <span>${item.nama}</span>
                        |
                        <span>
                            <button onclick="openFile(${item.id})">open</button>
                            <button onclick="deleteFile(${item.id})">delete</button>
                        </span>
                    </div>`);
                });
                cont.innerHTML = hasil;
                return hasil;
            }
            static init() {
                HalProject.list(document.body.querySelector('.list'));
                document.body.querySelector('button.baru').onclick = () => {
                    console.log('baru klik');
                    let file = {
                        id: 1 + '',
                        data: '',
                        nama: 'file1'
                    };
                    blockly.Data.baru(file);
                    blockly.Data.simpan();
                    document.location.reload();
                };
            }
        }
        blockly.HalProject = HalProject;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));

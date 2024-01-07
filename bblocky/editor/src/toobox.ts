///<reference path="./toolboxType.ts"/>

namespace ha.blockly.toolbox {
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

    export function init() {
        BDef.normalizeAllBlock();

        let allToolBoxDef = populateToolBox();
        Blockly.common.defineBlocksWithJsonArray(allToolBoxDef)

        toolbox.contents.push(getCategory(hiddenData.group, hiddenData.list, "true")); //registerBlitz());
        toolbox.contents.push(getCategory("Graphics", BlitzData.list)); //registerBlitz());
        toolbox.contents.push(getCategory("Image 1", ImageBlockData.list));
        toolbox.contents.push(getCategory("Image 2", ImageBlockData2.list));
        toolbox.contents.push(getCategory(debugData.group, debugData.list));
        toolbox.contents.push(getCategory(InputBlockData.group, InputBlockData.list));
        toolbox.contents.push(getCategory(TextData.group, TextData.list));

        js(allToolBoxDef);
    }

    function getCategory(nama: string, l: TToolBoxBlockDef[], hidden: string = "false") {
        let h: TToolbokContentDef = {
            kind: "category",
            name: nama,
            contents: getToolBoxContentDef(l),
            hidden: hidden
        }

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

    function getToolBoxContentDef(l: TToolBoxBlockDef[]): any[] {
        //register blitz content 
        let h: any[] = [];

        l.forEach((item) => {
            let def: TToolbokContentDef = {
                name: item.type,
                kind: ToolBoxKind.block,
                type: item.type
            }
            if (item.inputs) {
                def.inputs = item.inputs
            }

            h.push(def);
        })

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

    function populateToolBox(): TToolBoxBlockDef[] {
        let blockData: TToolBoxBlockDef[] = [];

        hiddenData.list.forEach((item) => {
            blockData.push(item);
        })
        BlitzData.list.forEach((item) => {
            blockData.push(item);
        })
        ImageBlockData.list.forEach((item) => {
            blockData.push(item);
        })
        ImageBlockData2.list.forEach((item) => {
            blockData.push(item);
        })
        debugData.list.forEach((item) => {
            blockData.push(item);
        })
        InputBlockData.list.forEach((item) => {
            blockData.push(item);
        })
        TextData.list.forEach((item) => {
            blockData.push(item);
        })

        return blockData;
    }

    function js(blockData: TToolBoxBlockDef[]) {
        for (let i = 0; i < blockData.length; i++) {
            let itemBlockData = blockData[i];
            // console.log('type: ' + itemBlockData.type);

            javascript.javascriptGenerator.forBlock[itemBlockData.type] = (block: any, generator: any): any => {
                let code = '';
                let statement = '';

                console.group("");

                if (itemBlockData.output == undefined) {
                    code += `\n/*${itemBlockData.message0}*/\n`;
                }

                code += itemBlockData.perintah.split('_')[0];
                code = code.replace("#update", "_update");

                if (itemBlockData.kurung) {
                    code += '(';
                }
                console.log('code', code);

                itemBlockData.args0.forEach((item, idx) => {
                    if (item.type == EArgType.inputDummy) {

                    }
                    else if (item.type == EArgType.input_end_row) {

                    }
                    else if (item.type == EArgType.statementValue) {
                        console.log("arg statement");
                        statement = generator.statementToCode(block, item.name);
                    }
                    else {
                        let value = generator.valueToCode(block, item.name, javascript.Order.ATOMIC);

                        code += value;

                        if (idx < itemBlockData.args0.length - 1) {
                            code += ','
                        }
                        console.log('code', code);

                    }
                });

                if (itemBlockData.kurung) {
                    code += ')';
                }
                console.log('code', code);

                if (statement) {
                    console.log("statement:", statement);
                    if (itemBlockData.stmt) {
                        code += `{${statement}}`;
                    }
                    else {
                        code += `;\n${statement}\n`;
                    }
                }
                else {

                }

                console.log("code", code);
                console.groupEnd();

                if (itemBlockData.output != null) {
                    return [code, Blockly.JavaScript.ORDER_NONE]
                }
                else {
                    return code + ';\n';
                }

            };
        }
    }

    // let blockData: TBlockDef[] = [];

    //default toolbox
    export const toolbox: TToolbokDef = {
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
    }
}



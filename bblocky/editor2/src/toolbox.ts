import { BDef } from "./blitzDefValue";
import { BlitzData } from "./block data/blitzData";
import { DebugData } from "./block data/debugData";
import { ImageBlockData } from "./block data/imgBlockData";
import * as Blockly from 'blockly';
import { Order, javascriptGenerator } from 'blockly/javascript';
import { TToolBoxBlockDef, TToolbokContentDef, ToolBoxKind, EArgType, TToolbokDef } from "./toolboxType";
import { GraphicsConf } from "./block data/GraphicsConf";
import { Teks } from "./block data/Teks";

export class Toolbox {
    static init() {
        BDef.normalizeAllBlock();

        let allToolBoxDef = this.populateToolBox();
        Blockly.common.defineBlocksWithJsonArray(allToolBoxDef)

        this.toolbox.contents.push(this.getCategory("Blitz", BlitzData.list)); //registerBlitz());
        this.toolbox.contents.push(this.getCategory("Image", ImageBlockData.list));
        this.toolbox.contents.push(this.getCategory(DebugData.group, DebugData.list));
        this.toolbox.contents.push(this.getCategory(GraphicsConf.group, GraphicsConf.list));
        this.toolbox.contents.push(this.getCategory(Teks.group, Teks.list));

        this.js(allToolBoxDef);
    }

    static getCategory(nama: string, l: TToolBoxBlockDef[]) {
        let h: TToolbokContentDef = {
            kind: "category",
            name: nama,
            contents: this.getToolBoxContentDef(l)
        }

        return h;
    }

    static getToolBoxContentDef(l: TToolBoxBlockDef[]): any[] {
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

    static populateToolBox(): TToolBoxBlockDef[] {
        let blockData: TToolBoxBlockDef[] = [];

        BlitzData.list.forEach((item) => {
            blockData.push(item);
        })
        ImageBlockData.list.forEach((item) => {
            blockData.push(item);
        })
        DebugData.list.forEach((item) => {
            blockData.push(item);
        })

        GraphicsConf.list.forEach((item) => {
            blockData.push(item);
        })

        Teks.list.forEach((item) => {
            blockData.push(item)
        })

        return blockData;
    }

    static js(blockData: TToolBoxBlockDef[]) {
        for (let i = 0; i < blockData.length; i++) {
            let itemBlockData = blockData[i];
            // console.log('type: ' + itemBlockData.type);
            // console.log("Blockly.Javascript ", javascriptGenerator);

            javascriptGenerator.forBlock[itemBlockData.type] = (block: any, generator: any): any => {
                let code = '';

                // console.group("");

                code = itemBlockData.type.split('_')[0] + '(';

                itemBlockData.args0.forEach((item, idx) => {
                    if (item.type == EArgType.inputDummy) {

                    }
                    else if (item.type == EArgType.field_variable) {
                        var variable_name = generator.nameDB_.getName(block.getFieldValue(item.name), Blockly.Variables.CATEGORY_NAME);
                        code += variable_name;

                        if (idx < itemBlockData.args0.length - 1) {
                            code += ','
                        }
                    }
                    else {
                        let value = generator.valueToCode(block, item.name, Order.ATOMIC);
                        // console.log('value to code >>', "item name:", item.name, "value", value);

                        code += value;

                        if (idx < itemBlockData.args0.length - 1) {
                            code += ','
                        }
                    }
                });
                code += ')';

                // console.log("code", code);
                // console.groupEnd();

                if (itemBlockData.output != null) {
                    return [code, Order.NONE]
                }
                else {
                    return code + ';\n';
                }

            };
        }
    }

    //default toolbox
    static readonly toolbox: TToolbokDef = {
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




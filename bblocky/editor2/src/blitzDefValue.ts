import { BlitzData } from "./block data/blitzData";
import { DebugData } from "./block data/debugData";
import { ImageBlockData } from "./block data/imgBlockData";

export class BDef {
    static defValue(t: TToolBoxBlockDef): void {
        console.group("defValue");
        console.log(t);

        if (t.output) {

        }
        else {
            t.previousStatement = null;
            t.nextStatement = null;
        }

        if (!(Object as any).hasOwn(t, "inputsInline")) {
            t.inputsInline = false;
        }

        t.colour = 230;
        t.tooltip = t.tooltip || "";
        t.helpUrl = t.helpUrl || "";

        console.log(t)
        console.groupEnd();
    }

    static createShadow(t: TArgDef): any {
        if (EOutput.String == t.check) {
            return {
                shadow: {
                    "type": "text",
                    "fields": {
                        "TEXT": t.default
                    }
                }
            }
        } else if (EOutput.Number == t.check) {
            return {
                shadow: {
                    "type": "math_number",
                    "fields": {
                        "NUM": t.default
                    }
                }
            }
        } else if (EOutput.Boolean) {
            return {
                shadow: {
                    "type": "logic_boolean",
                    "fields": {
                        "BOOL": t.default
                    }
                }
            }
        }
        else if (EOutput.Dummy) {

        }

        throw Error('not supported: ' + t.check);
    }

    static addArg(t: TToolBoxBlockDef) {

        function getCheck(n: any): EOutput {
            if (typeof n == "number") return EOutput.Number;
            if (typeof n == "string") return EOutput.String;
            if (typeof n == "boolean") return EOutput.Boolean;
            throw Error(n);
        }

        t.args0 = [];
        for (let i in t.args) {
            if ("dummy" == i.toLocaleLowerCase()) {
                t.args0.push({
                    type: EArgType.inputDummy
                })
            } else {
                t.args0.push({
                    check: getCheck(t.args[i]),
                    type: EArgType.inputValue,
                    default: t.args[i] + '',
                    name: i + ''
                })
            }
        }
    }

    static addInput(t: TToolBoxBlockDef) {
        if (t.inputs) return;

        let inputs: any = {}
        t.args0.forEach((item) => {
            if (item.type == EArgType.inputDummy) {

            }
            else {
                inputs[item.name] = this.createShadow(item);
            }
        })

        t.inputs = inputs;
    }

    static normal(t: TToolBoxBlockDef) {
        this.defValue(t);
        this.addArg(t);
        this.addInput(t);
    }

    static normalizeAllBlock() {
        BlitzData.list.forEach((item) => { this.normal(item); });
        ImageBlockData.list.forEach((item) => { this.normal(item) });
        DebugData.list.forEach((item) => { this.normal(item) });
    }

}



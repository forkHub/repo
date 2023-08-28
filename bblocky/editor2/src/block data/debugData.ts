import { TToolBoxBlockDef } from "../toolboxType";

export class DebugData {
    static readonly list: TToolBoxBlockDef[] = [];
    static readonly group = "Debug3";

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
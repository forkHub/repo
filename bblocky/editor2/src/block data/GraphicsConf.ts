import { TToolBoxBlockDef } from "../toolboxType";

export class GraphicsConf {
    static readonly list: TToolBoxBlockDef[] = [];
    static readonly group = "configuration";

    static init() {
        // ha.bbjs.konf.useStroke
        GraphicsConf.list.push({
            type: 'ha.bbjs.Konf.useStroke',
            message0: "use stroke %1 ",
            args: {
                b: false
            },
        });

    }
}
GraphicsConf.init();

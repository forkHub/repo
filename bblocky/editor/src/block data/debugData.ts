namespace ha.blockly.debugData {
    export const list: TToolBoxBlockDef[] = [];
    export const group = "Debug";

    list.push({
        type: 'ha.bbjs.Debug.Obj',
        message0: "Debug %1 ",
        args: {
            obj: 0
        },
    });
}
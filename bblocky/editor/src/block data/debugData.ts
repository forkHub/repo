namespace ha.blockly.debugData {
    export const list: TToolBoxBlockDef[] = [];
    export const group = "Debug";

    list.push({
        type: "console.log",
        perintah: "console.log",
        message0: "Log %1",
        args: {
            log: ""
        },
        tooltip: "console log",
    });

    list.push({
        type: "debugger",
        perintah: "debugger",
        message0: "Pause",
        tooltip: "pause a program when developer tool is open",
        kurung: false
    });



}
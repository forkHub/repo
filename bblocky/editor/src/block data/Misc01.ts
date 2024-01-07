namespace ha.blockly.debugData {
    export const list: TToolBoxBlockDef[] = [];
    export const group = "Misc";

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
        tooltip: `
            Pause a program when developer tool is open.
            This is the alias for debugger
        `,
        kurung: false
    });

    list.push({
        type: "note",
        perintah: "//",
        kurung: false,
        message0: "📝 %1",
        args: {
            comment: ""
        },
        tooltip: "Add note. Will be converted into comment in the real code",
    });


}
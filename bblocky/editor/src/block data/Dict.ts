namespace ha.blockly.Dict {
    export const list: TToolBoxBlockDef[] = [];
    export const group = "Text 2";

    // Shortcut buat perintah-perintah font
    // FontName
    list.push({
        type: "ha.be.Teks.Font",
        perintah: "FontName",
        message0: "Set Font Name to %1",
        args: {
            name: "cursive"
        }
    })
}
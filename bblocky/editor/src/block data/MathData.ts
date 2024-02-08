namespace ha.blockly.MathBlockData {
    export const list: TToolBoxBlockDef[] = [];
    export const group = "Math 2";

    // DistMin
    // ha.be.Transform.degDistMin
    list.push({
        type: "ha.be.Transform.degDistMin",
        perintah: "DistMin",
        message0: "Dist from %1 to %2",
        args: {
            fw: 0,
            fh: 0
        },
        output: EOutput.Number,
        inputsInline: true,
        tooltip: 'return minimum distance between two angles'
    })
}

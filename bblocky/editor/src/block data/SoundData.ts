namespace ha.blockly.SoundData {
    export const list: TToolBoxBlockDef[] = [];
    export const group = "sound";

    // ha.be.Sound.Load;
    // ha.be.Sound.Play;
    // ha.be.Sound.SoundEnded;
    // ha.be.Sound.SoundLoaded


    list.push({
        type: "ha.be.Sound.Load",
        perintah: "LoadSound",
        message0: "Load Sound",
        tooltip: `
            Load sound from URL
        `,
        output: EOutput.Any
    })
}
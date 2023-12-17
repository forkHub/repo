///<reference path="../toolboxType.ts"/>

namespace ha.blockly.BlitzData {

    export const list: TToolBoxBlockDef[] = [];

    // ha.be.Be.Grafis
    export const Grafis: TToolBoxBlockDef = {
        type: "ha.be.Be.Grafis",
        perintah: "ha.be.Be.Grafis",
        message0: "Graphics %1 width: %2 height: %3",
        inputsInline: true,
        args: {
            dummy: '',
            width: 320,
            height: 240
        }
    };
    list.push(Grafis);

    // ha.be.Be.Bersih
    list.push({
        type: "ha.be.Be.Bersih",
        perintah: "ha.be.Be.Bersih",
        message0: 'Cls',
    });

}

///<reference path="../toolboxType.ts"/>

namespace ha.blockly.BlitzData {

    export const Grafis: TToolBoxBlockDef = {
        type: "Grafis",
        message0: "Graphics %1 width: %2 height: %3",
        // inputsInline: false,
        args: {
            dummy: '',
            width: 320,
            height: 240
        }
    };

    export const list: TToolBoxBlockDef[] = [];

    list.push(Grafis);

    // ha.bbjs.General.Graphics full
    list.push({
        type: "Grafis_full",
        message0: "Graphics %1 width: %2 height: %3 canvas id: %4 fullScreen: %5 handleInput: %6",
        inputsInline: false,
        args: {
            dummy: '',
            width: 320,
            height: 240,
            canvasId: "canvas_id",
            fullScreen: true,
            handleInput: true
        }
    })

    list.push({
        type: "ha.be.Main.Bersih",
        message0: 'Cls',
    });





}

//TODO: next butuh alias type, buat backward compatibility

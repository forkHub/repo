export class BlitzData {
    static readonly Grafis: TToolBoxBlockDef = {
        type: "Grafis",
        message0: "Graphics %1 width: %2 height: %3",
        // inputsInline: false,
        args: {
            dummy: '',
            width: 320,
            height: 240
        }
    };

    static readonly list: TToolBoxBlockDef[] = [];

    static init() {
        this.list.push(this.Grafis);

        // ha.bbjs.General.Graphics full
        this.list.push({
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

        this.list.push({
            type: "ha.be.Main.Bersih",
            message0: 'Cls',
        });
    }
}
BlitzData.init();


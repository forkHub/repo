namespace ha.blockly.ImageBlockData {
    export const list: TToolBoxBlockDef[] = [];

    export const blitz_Muat: TToolBoxBlockDef = {
        type: "ha.bbjs.Sprite.LoadSprite",
        message0: 'Load Image %1 url: %2',
        args: {
            dummy: '',
            url: "./imgs/box.png"
        },
        output: EOutput.Number
    }

    list.push(blitz_Muat);

    //ha.bbjs.Sprite.LoadSprite full
    list.push({
        type: 'ha.bbjs.Sprite.LoadSprite_full',
        message0: "Load Image %1 url: %2 drag mode: %3",
        args: {
            dummy: '',
            url: './imgs/box.png',
            dragMode: 1
        },
        output: EOutput.Number
    });

    // ha.bbjs.Sprite.DrawSprite 
    //depecrated
    list.push({
        type: "ha.bbjs.Sprite.DrawSprite",
        message0: "Draw %1 image: %2",
        args: {
            dummy: '',
            sprite: 0
        }
    })
}
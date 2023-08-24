export class ImageBlockData {
    static list = [];
    static blitz_Muat = {
        type: "ha.bbjs.Sprite.LoadSprite",
        message0: 'Load Image %1 url: %2',
        args: {
            dummy: '',
            url: "./imgs/box.png"
        },
        output: EOutput.Number
    };
    static init() {
        this.list.push(this.blitz_Muat);
        //ha.bbjs.Sprite.LoadSprite full
        this.list.push({
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
        this.list.push({
            type: "ha.bbjs.Sprite.DrawSprite",
            message0: "Draw %1 image: %2",
            args: {
                dummy: '',
                sprite: 0
            }
        });
    }
}
ImageBlockData.init();

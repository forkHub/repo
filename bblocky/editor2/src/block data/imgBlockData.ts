import { EOutput, TToolBoxBlockDef } from "../toolboxType";

export class ImageBlockData {
    static readonly list: TToolBoxBlockDef[] = [];

    static readonly blitz_Muat: TToolBoxBlockDef = {
        type: "ha.bbjs.Sprite.LoadSprite",
        message0: 'Load Image %1 url: %2',
        args: {
            dummy: '',
            url: "./imgs/box.png"
        },
        output: EOutput.Number
    }

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

        // ha.bbjs.Sprite.DrawSprite deprecated
        this.list.push({
            type: "ha.bbjs.Sprite.DrawSprite",
            message0: "Draw %1 image: %2",
            args: {
                dummy: '',
                spr: 0
            }
        })

        // ha.bbjs.Sprite.DrawSprite 
        this.list.push({
            type: "ha.bbjs.Sprite.DrawSprite_v2",
            message0: "Draw %1 image: %2",
            args: {
                dummy: '',
                var: 'img'
            },
            inputsInline: true
        })

        // ha.bbjs.Sprite.Position deprecated
        this.list.push({
            type: "ha.bbjs.Sprite.Position",
            message0: "image %1 set position %4 x %2 y %3",
            args: {
                var: 'img',
                x: 0,
                y: 0,
                dummy: ''
            }
        })

        //ha.bbjs.Sprite.Position
        this.list.push({
            "type": "ha.bbjs.Sprite.Position_v2",
            "message0": "image %1 set position %2 x %3 y %4",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "img",
                    "variable": "img"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "x",
                    "check": "Number",
                    "align": "RIGHT"
                },
                {
                    "type": "input_value",
                    "name": "y",
                    "check": "Number",
                    "align": "RIGHT"
                }
            ],
            "inputsInline": false,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })

        // ha.bbjs.Sprite.GetPositionX deprecated
        this.list.push({
            type: "ha.bbjs.Sprite.GetPositionX",
            message0: "image %1 get position X",
            output: EOutput.Number,
            inputsInline: true,
            args: {
                spr: 0,
            }
        })

        this.list.push({
            type: "ha.bbjs.Sprite.GetPositionX_v2",
            message0: "image %1 get position X",
            output: EOutput.Number,
            inputsInline: true,
            args: {
                var: 'img',
            }
        })


        // ha.bbjs.Sprite.GetPositionY
        this.list.push({
            type: "ha.bbjs.Sprite.GetPositionY",
            message0: "image %1 get position Y",
            inputsInline: true,
            output: EOutput.Number,
            args: {
                img: 0,
            }
        })

        // ha.bbjs.Sprite.GetPositionY
        this.list.push({
            type: "ha.bbjs.Sprite.GetPositionY_v2",
            message0: "image %1 get position Y",
            inputsInline: true,
            output: EOutput.Number,
            args: {
                var: 'img',
            }
        })


        //handle
        // ha.bbjs.Sprite.Handle
        this.list.push({
            type: "ha.bbjs.Sprite.Handle",
            message0: "image %1 set handle %4 X %2 Y %3",
            args: {
                var: 'img',
                x: 0,
                y: 0,
                dummy: ''
            }
        })

        // ha.bbjs.Sprite.RotateSprite;
        this.list.push({
            type: "ha.bbjs.Sprite.RotateSprite",
            message0: "image %1 set rotation to %2 ",
            args: {
                var: 'img',
                rot: 0,
            },
            inputsInline: true
        })

        // ha.bbjs.Sprite.GetRotation => deprecated
        this.list.push({
            type: "ha.bbjs.Sprite.GetRotation",
            message0: "image %1 get rotation",
            args: {
                spr: 0,
            },
            inputsInline: true,
            output: EOutput.Number
        })

        this.list.push({
            type: "ha.bbjs.Sprite.GetRotation_v2",
            message0: "image %1 get rotation",
            args: {
                var: 'img',
            },
            inputsInline: true,
            output: EOutput.Number
        })

        //resize
        // ha.bbjs.Sprite.ResizeSprite;
        this.list.push({
            type: "ha.bbjs.Sprite.ResizeSprite",
            message0: "image %1 resize %4 width %2 height %3",
            args: {
                var: 'img',
                width: 0,
                height: 0,
                dummy: ''
            }
        })

        // ha.bbjs.Sprite.SpriteWidth;
        // ha.bbjs.Sprite.SpriteHeight


    }

}
ImageBlockData.init();
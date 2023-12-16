namespace ha.blockly.ImageBlockData2 {
    export const list: TToolBoxBlockDef[] = [];

    // const ImageLoaded = ha.be.Spr.Dimuat;
    // ImageLoaded
    list.push({
        type: "ha.be.Spr.Dimuat",
        perintah: "ImageLoaded",
        message0: "Image %1 loaded",
        inputsInline: true,
        args: {
            sprite: {},
        },
        output: EOutput.Boolean
    })

    // const AllImageLoaded = ha.be.Spr.StatusMuat;
    list.push({
        type: "ha.be.Spr.StatusMuat",
        perintah: "AllImageLoaded",
        message0: "All Images Loaded",
        output: EOutput.Boolean,
        tooltip: 'Check if All Images have been loaded'
    })

    // const PositionImageXY = ha.be.Spr.Posisi;
    // PositionImageXY
    list.push({
        type: "ha.be.Spr.Posisi",
        perintah: "PositionImageXY",
        message0: "Image %1 set position to x %2 y %3",
        inputsInline: true,
        args: {
            sprite: {},
            x: 0,
            y: 0
        },
        tooltip: 'Position image at x,y'
    })

    // const PositionImagePolar = ha.be.Spr.posisiPolar;
    // PositionImagePolar
    list.push({
        type: "ha.be.Spr.posisiPolar",
        perintah: "PositionImagePolar",
        message0: "Image %1 set position relative to x %4 y %5 by angle %2 at dist %3 scale x %6 scale y %7",
        inputsInline: true,
        args: {
            sprite: {},
            angle: 0,
            dist: 100,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1
        },
        tooltip: 'Position image relative to certain position'
    })

    // const DrawAllImage = ha.be.Spr.GambarSemua;
    list.push({
        type: "ha.be.Spr.GambarSemua",
        perintah: "DrawAllImage",
        message0: "DrawAllImage",
        tooltip: 'Draw All Images, ordered by created time'
    })

    // const ImageXPosition = ha.be.Spr.PosisiX;
    // ImageXPosition
    list.push({
        type: "ha.be.Spr.PosisiX",
        perintah: "ImageXPosition",
        message0: "ImageXPosition %1",
        args: {
            sprite: {},
        },
        output: EOutput.Number,
        tooltip: 'Return Image x position'
    })

    // const ImageYPosition = ha.be.Spr.PosisiY;
    // ImageYPosition
    list.push({
        type: "ha.be.Spr.PosisiY",
        perintah: "ImageYPosition",
        message0: "ImageYPosition %1",
        args: {
            sprite: {},
        },
        output: EOutput.Number,
        tooltip: 'Return Image y position'
    })

    // const ImageAlpha = ha.be.Spr.Alpha;
    // ImageAlpha
    list.push({
        type: "ha.be.Spr.Alpha",
        perintah: "ImageAlpha",
        message0: "Image %1 set alpha to (0-100) %2",
        args: {
            sprite: {},
            alpha: 100
        },
        inputsInline: true,
        tooltip: 'set image alpha '
    })

    // const ImageIsDragged = ha.be.Spr.StatusDrag;
    list.push({
        type: "ha.be.Spr.StatusDrag",
        perintah: "ImageIsDragged",
        message0: "Image %1 is dragged",
        args: {
            sprite: {},
        },
        inputsInline: true,
        tooltip: 'return true if image is dragged'
    })



}

//next
// const CopyImage = ha.be.Spr.Copy;
// const ImageBound = ha.be.Spr.Bound;

//next 2
// const SpriteKontek = ha.be.Spr.kontek;
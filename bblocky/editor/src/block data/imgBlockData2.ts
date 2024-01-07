namespace ha.blockly.ImageBlockData2 {
    export const list: TToolBoxBlockDef[] = [];

    // DrawImage
    list.push({
        type: "ha.be.Spr.Gambar_no_frame",
        perintah: "DrawImage",
        message0: "Draw Image %1",
        inputsInline: true,
        args: {
            sprite: {},
        },
        tooltip: "Draw image to screen"
    })

    // DrawImageAnim
    // DrawImage
    // ha.be.Spr.Gambar animasi
    list.push({
        type: "ha.be.Spr.Gambar_animasi",
        message0: "DrawImage %1 image %2 frame: %3",
        perintah: "DrawImage",
        inputsInline: true,
        args: {
            dummy: '',
            sprite: {},
            frame: 0,
        },
        tooltip: `
            Draw image at specific frame.
        `
    })

    // const DrawAllImage = ha.be.Spr.GambarSemua;
    list.push({
        type: "ha.be.Spr.GambarSemua",
        perintah: "DrawAllImage",
        message0: "DrawAllImage",
        tooltip: 'Draw All Images, ordered by created time'
    })

    // ha.be.Spr.DragMode();
    list.push({
        type: "ha.be.Spr.DragMode",
        perintah: "ha.be.Spr.DragMode",
        message0: "Image %1 set drag mode to %2",
        inputsInline: true,
        args: {
            sprite: {},
            dragMode: 1
        },
        tooltip: `
            Make an image dragable.

            There are two drag-mode available:
            - 0: no interaction, default
            - 1: move
            - 2: rotate
            - 3: move on any drag, even if you don't actually touch the image 
            - 4: rotate on any drag, even if you don't actually touch the image
        `
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
        tooltip: `Position image at x, y`
    })


    // const PositionImagePolar = ha.be.Spr.posisiPolar;
    // PositionImagePolar
    list.push({
        type: "ha.be.Spr.posisiPolar_no_scale",
        perintah: "PositionImagePolar",
        message0: "Image %1 set position relative to x %4 y %5 by angle %2 at dist %3",
        inputsInline: true,
        args: {
            sprite: {},
            angle: 0,
            dist: 100,
            x: 0,
            y: 0,
        },
        tooltip: `Position image relative to a certain position
        Can be used to create orbitng motion
        `
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
        tooltip: 'Position image relative to certain position, scale is used to create an elipse movement'
    })

    // const PositionImagePolar = ha.be.Spr.posisiPolar;
    // PositionImagePolar
    list.push({
        type: "ha.be.Spr.posisiPolar_tilt",
        perintah: "PositionImagePolar",
        message0: "Image %1 set position relative to x %4 y %5 by angle %2 at dist %3 scale x %6 scale y %7 tilt %8",
        inputsInline: true,
        args: {
            sprite: {},
            angle: 0,
            dist: 100,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            tilt: 0
        },
        tooltip: `
        Position image relative to certain position, 
        scale is used to create an elipse movement, 
        tilt is used to create a rotated elipse effect`
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
        tooltip: 'Set image alpha '
    })

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
        tooltip: `Return true is image is already loaded`,
        output: EOutput.Boolean
    })

    // const AllImageLoaded = ha.be.Spr.StatusMuat;
    list.push({
        type: "ha.be.Spr.StatusMuat",
        perintah: "AllImageLoaded",
        message0: "All Images Loaded",
        output: EOutput.Boolean,
        tooltip: 'Return true if All Images have been loaded'
    })


    // const ImageXPosition = ha.be.Spr.PosisiX;
    // ImageXPosition
    list.push({
        type: "ha.be.Spr.PosisiX",
        perintah: "ImageXPosition",
        message0: "Image %1 get X position",
        args: {
            sprite: {},
        },
        inputsInline: true,
        output: EOutput.Number,
        tooltip: 'Return Image x position'
    })

    // const ImageYPosition = ha.be.Spr.PosisiY;
    // ImageYPosition
    list.push({
        type: "ha.be.Spr.PosisiY",
        perintah: "ImageYPosition",
        message0: "Image %1 get Y position",
        args: {
            sprite: {},
        },
        inputsInline: true,
        output: EOutput.Number,
        tooltip: 'Return Image y position'
    })

    //rotation get
    // Rotation
    // ha.be.Spr.Rotasi
    list.push({
        type: "ha.be.Spr.Rotasi_get",
        perintah: "Rotation",
        message0: "Image %1 get rotation",
        args: {
            sprite: {},
        },
        inputsInline: true,
        output: EOutput.Number,
        tooltip: 'Set image rotation'
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
        output: EOutput.Boolean,
        tooltip: 'return true if image is dragged'
    })

    // ha.be.Spr.Tabrakan
    //Collide
    list.push({
        type: "ha.be.Spr.Tabrakan",
        perintah: "Collide",
        message0: "check Image %1 is collided with Image %2",
        args: {
            sprite1: {},
            sprite2: {},
        },
        output: EOutput.Boolean,
        inputsInline: true,
        tooltip: 'return true if two images is collided'
    })

}

//next
// const CopyImage = ha.be.Spr.Copy;
// const ImageBound = ha.be.Spr.Bound;

//next 2
// const SpriteKontek = ha.be.Spr.kontek;
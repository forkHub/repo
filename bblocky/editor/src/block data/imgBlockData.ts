namespace ha.blockly.ImageBlockData {
    export const list: TToolBoxBlockDef[] = [];

    // ha.be.Spr.Muat
    export const blitz_Muat: TToolBoxBlockDef = {
        type: "ha.be.Spr.Muat",
        message0: 'LoadImage %1 url: %2',
        perintah: "LoadImage",
        args: {
            dummy: '',
            url: "./imgs/box.png"
        },
        inputsInline: true,
        output: EOutput.Any,
        tooltip: `
            Load an Image from url.
            Url can be local or absolute.
            When you are drawing an image, 
            and the image is still loaded, 
            then it will only draw a blank image
        `
    }
    list.push(blitz_Muat);

    // LoadAnimImage
    // ha.be.Spr.MuatAnimasi
    list.push({
        type: "ha.be.Spr.MuatAnimasi",
        message0: "LoadAnimImage %1 url: %2 frame width: %3 frame height: %4",
        perintah: "LoadAnimImage",
        args: {
            dummy: '',
            sprite: {},
            fw: 32,
            fh: 32
        },
        inputsInline: true,
        output: EOutput.Any,
        tooltip: 'Load image that contains multiple frames/spritesheet'
    })


    // DrawImage
    // ha.be.Spr.GambarXY
    // DrawImageXY
    list.push({
        type: "ha.be.Spr.Gambar",
        message0: "DrawImage: %4 image %1 x: %2 y: %3",
        perintah: "DrawImageXY",
        inputsInline: true,
        args: {
            sprite: {},
            x: 0,
            y: 0,
            dummy: ""
        }
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
        }
    })

    // TileImage
    //ha.be.Spr.Ubin;
    list.push({
        type: "ha.be.Spr.Ubin",
        message0: "TileImage: %5 image %1 x: %2 y: %3 frame: %4",
        perintah: "Tile",
        inputsInline: true,
        args: {
            sprite: {},
            x: 0,
            y: 0,
            frame: 0,
            dummy: ''
        }
    })

    // HandleImage
    // ha.be.Spr.Handle
    list.push({
        type: "ha.be.Spr.Handle",
        message0: "HandleImage: %1 image %2 x: %3 y: %4",
        perintah: "Handle",
        inputsInline: true,
        args: {
            dummy: '',
            sprite: {},
            x: 0,
            y: 0,
        }
    })

    // ResizeImage
    // ha.be.Spr.Ukuran;
    list.push({
        type: "ha.be.Spr.Ukuran",
        perintah: "ResizeImage",
        message0: "ResizeImage: %1 image %2 width: %3 height: %4",
        inputsInline: true,
        args: {
            dummy: '',
            sprite: {},
            width: 0,
            height: 0,
        }
    })

    // RotateImage 
    // ha.be.Spr.Rotasi;
    list.push({
        type: "ha.be.Spr.Rotasi",
        perintah: "Rotation",
        message0: "RotateImage: %1 image %2 value (0-360): %3",
        inputsInline: true,
        args: {
            dummy: '',
            sprite: {},
            angle: 0
        }
    })

    // ImageAlpha
    // ha.be.Spr.Alpha
    list.push({
        type: "ha.be.Spr.Alpha",
        perintah: "ImageAlpha",
        message0: "ImageAlpha: %1 image %2 value (0-100): %3",
        inputsInline: true,
        args: {
            dummy: '',
            image: {},
            alpha: 50
        }
    })

    // CopyImage
    //TODO


    /**
     * INFO
     * ==== 
     */

    // ImageWidth
    // ha.be.Spr.Panjang;
    // Width
    list.push({
        type: "ha.be.Spr.Panjang",
        perintah: "Width",
        message0: "ImageWidth: %1 image %2",
        inputsInline: true,
        args: {
            dummy: '',
            sprite: {},
        },
        output: EOutput.Number
    })

    // ImageHeight
    // ha.be.Spr.Lebar;
    // Height
    list.push({
        type: "ha.be.Spr.Lebar",
        perintah: "Height",
        message0: "ImageHeight: %1 image %2",
        args: {
            dummy: '',
            sprite: {},
        },
        output: EOutput.Number
    })

    // ImageXHandle
    // ha.be.Spr.HandleX
    list.push({
        type: "ha.be.Spr.HandleX",
        perintah: "ha.be.Spr.HandleX",
        message0: "ImageXHandle: %1 image %2",
        args: {
            dummy: '',
            sprite: {},
        },
        tooltip: "return the image-handle X coordinate",
        output: EOutput.Number
    })

    // ImageYHandle
    // ha.be.Spr.HandleY
    list.push({
        type: "ha.be.Spr.HandleY",
        perintah: "ha.be.Spr.HandleY",
        message0: "ImageYHandle: %1 image %2",
        args: {
            dummy: '',
            sprite: {},
        },
        tooltip: "return the image-handle Y coordinate",
        output: EOutput.Number
    })

    // ImagesCollideXY
    // ha.be.Spr.TabrakanXY;
    list.push({
        type: "ha.be.Spr.TabrakanXY",
        message0: "ImagesCollide: %1 image1: %2 x1: %3 y1: %4 image2: %5 x2: %6 y2: %7",
        perintah: "ha.be.Spr.TabrakanXY",
        args: {
            dummy: '',
            sprite: {},
            x1: 0,
            y1: 0,
            sprite2: {},
            x2: 0,
            y2: 0
        },
        inputsInline: true,
        tooltip: "return true if two images are collided at position",
        output: EOutput.Boolean,
    })


}

//next
// const Loaded = ha.be.Spr.Dimuat;
// const StatusMuat = ha.be.Spr.StatusMuat;
// const Posisi = ha.be.Spr.Posisi;
// const PosisiPolar = ha.be.Spr.posisiPolar;
// const GambarSemua = ha.be.Spr.GambarSemua;
// const PosisiX = ha.be.Spr.PosisiX;
// const PosisiY = ha.be.Spr.PosisiY;
// const Alpha = ha.be.Spr.Alpha;
// const StatusDrag = ha.be.Spr.StatusDrag;
// const Copy = ha.be.Spr.Copy;
// const Bound = ha.be.Spr.Bound;

//next 2
// const SpriteKontek = ha.be.Spr.kontek;

//not supported
// CreateImage
// FreeImage
// SaveImage
// GrabImage
// ImageBuffer
// DrawImageRect
// DrawBlockRect
// DrawBlock
// TileBlock
// MaskImage
// MidHandle => todo
// AutoMidHandle => todo
// ScaleImage
// TFormImage
// TFormFilter
// ImagesOverlap
// RectsOverlap
// ImageRectOverlap
// ImageRectCollide

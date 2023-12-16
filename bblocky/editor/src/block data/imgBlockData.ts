namespace ha.blockly.ImageBlockData {
    export const list: TToolBoxBlockDef[] = [];

    // ha.be.Spr.Muat
    export const blitz_Muat: TToolBoxBlockDef = {
        type: "ha.be.Spr.Muat",
        message0: 'Load Image %1 url: %2',
        perintah: "ha.be.Spr.Muat",
        args: {
            dummy: '',
            url: "./imgs/box.png"
        },
        output: EOutput.Any
    }
    list.push(blitz_Muat);

    // LoadAnimImage
    // ha.be.Spr.MuatAnimasi
    list.push({
        type: "ha.be.Spr.MuatAnimasi",
        message0: "LoadAnimImage %1 image: %2 frame width: %3 frame height: %4",
        perintah: "ha.be.Spr.MuatAnimasi",
        args: {
            dummy: '',
            sprite: {},
            fw: 32,
            fh: 32
        },
        output: EOutput.Any
    })


    // DrawImage
    // ha.be.Spr.Gambar
    list.push({
        type: "ha.be.Spr.Gambar",
        message0: "DrawImage: %4 image %1 x: %2 y: %3",
        perintah: "ha.be.Spr.Gambar",
        args: {
            sprite: {},
            x: 0,
            y: 0,
            dummy: ""
        }
    })

    // DrawImage
    // ha.be.Spr.Gambar animasi
    list.push({
        type: "ha.be.Spr.Gambar_animasi",
        message0: "DrawImageAnim: %5 image %1 x: %2 y: %3 frame: %4",
        perintah: "ha.be.Spr.Gambar_animasi",
        args: {
            sprite: {},
            x: 0,
            y: 0,
            frame: 0,
            dummy: ''
        }
    })

    // TileImage
    //ha.be.Spr.Ubin;
    list.push({
        type: "ha.be.Spr.Ubin",
        message0: "TileImage: %5 image %1 x: %2 y: %3 frame: %4",
        perintah: "ha.be.Spr.Ubin",
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
        perintah: "ha.be.Spr.Handle",
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
        perintah: "ha.be.Spr.Ukuran",
        message0: "ResizeImage: %1 image %2 width: %3 height: %4",
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
        perintah: "ha.be.Spr.Rotasi",
        message0: "RotateImage: %1 image %2 value (0-360): %3",
        args: {
            dummy: '',
            sprite: {},
            angle: 0
        }
    })

    // CopyImage


    /**
     * INFO
     * ==== 
     */

    // ImageWidth
    // ha.be.Spr.Panjang;
    list.push({
        type: "ha.be.Spr.Panjang",
        perintah: "ha.be.Spr.Panjang",
        message0: "ImageWidth: %1 image %2",
        args: {
            dummy: '',
            sprite: {},
        },
        output: EOutput.Number
    })

    // ImageHeight
    // ha.be.Spr.Lebar;
    list.push({
        type: "ha.be.Spr.Lebar",
        perintah: "ha.be.Spr.Lebar",
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

    // ImagesCollide
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
        tooltip: "return true if two images are collided at position",
        output: EOutput.Boolean,
    })
}


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

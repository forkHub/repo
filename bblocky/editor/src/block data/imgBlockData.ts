namespace ha.blockly.ImageBlockData {
    export const list: TToolBoxBlockDef[] = [];

    // ha.be.Sprite.Muat
    export const blitz_Muat: TToolBoxBlockDef = {
        type: "ha.be.Sprite.Muat",
        message0: 'Load Image %1 url: %2',
        args: {
            dummy: '',
            url: "./imgs/box.png"
        },
        output: EOutput.Any
    }
    list.push(blitz_Muat);

    // LoadAnimImage
    // ha.be.Sprite.MuatAnimasi
    list.push({
        type: "ha.be.Sprite.MuatAnimasi",
        message0: "LoadAnimImage %1 image: %2 frame width: %3 frame height: %4",
        args: {
            dummy: '',
            sprite: {},
            fw: 32,
            fh: 32
        },
        output: EOutput.Any
    })


    // DrawImage
    // ha.be.Sprite.Gambar
    list.push({
        type: "ha.be.Sprite.Gambar",
        message0: "DrawImage: %4 image %1 x: %2 y: %3",
        args: {
            sprite: {},
            x: 0,
            y: 0,
            dummy: ""
        }
    })

    // DrawImage
    // ha.be.Sprite.Gambar animasi
    list.push({
        type: "ha.be.Sprite.Gambar_animasi",
        message0: "DrawImage: %5 image %1 x: %2 y: %3 frame: %4",
        args: {
            sprite: {},
            x: 0,
            y: 0,
            frame: 0,
            dummy: ''
        }
    })

    // TileImage
    //ha.be.Sprite.Ubin;
    list.push({
        type: "ha.be.Sprite.Ubin",
        message0: "TileImage: %5 image %1 x: %2 y: %3 frame: %4",
        args: {
            sprite: {},
            x: 0,
            y: 0,
            frame: 0,
            dummy: ''
        }
    })

    // HandleImage
    // ha.be.Sprite.Handle
    list.push({
        type: "ha.be.Sprite.Handle",
        message0: "HandleImage: %1 image %2 x: %3 y: %4",
        args: {
            dummy: '',
            sprite: {},
            x: 0,
            y: 0,
        }
    })

    // ResizeImage
    // ha.be.Sprite.Ukuran;

    // RotateImage
    // ImageWidth
    // ImageHeight
    // ImageXHandle
    // ImageYHandle
    // ImagesCollide

}


// CopyImage
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
namespace ha.blockly.ImageBlockData {
	export const group: string = "Image 1";
	export const list: TToolBoxBlockDef[] = [];
	export const hidden = "false";

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
			url: "./imgs/exp2_0.png",
			fw: 32,
			fh: 32
		},
		inputsInline: true,
		output: EOutput.Any,
		tooltip: `
        Load image that contains multiple frames (spritesheet)
           
        Params:
        url: the url of image, can be local or absolute
        fw: frame wdith
        fh: frame height 
        `
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
		},
		tooltip: `
            Draw image at x, y location.
            When the image is not yet fully loaded, then it will not draw anything.
        `
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
		},
		tooltip: `
            Draw image with tiling effect
            When the image is not yet fully loaded, then it will not draw anything.
        `
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
		},
		tooltip: `
            Set the position of image handle, 
            useful for rotation when you want to rotate at specific position 
            rather than from top-left position
        `
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
		},
		tooltip: `Resize an Image`
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
		},
		tooltip: `Rotate an image`
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
		},
		tooltip: `Set image alpha/transparency`
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
		message0: "Image %2 get width %1",
		inputsInline: true,
		args: {
			dummy: '',
			sprite: {},
		},
		output: EOutput.Number,
		tooltip: `Return image width
        Will return zero when image is still loading
        `
	})

	// ImageHeight
	// ha.be.Spr.Lebar;
	// Height
	list.push({
		type: "ha.be.Spr.Lebar",
		perintah: "Height",
		message0: "%1 Image %2 get height",
		args: {
			dummy: '',
			sprite: {},
		},
		inputsInline: true,
		output: EOutput.Number,
		tooltip: `Return image get height
        Will return zero when image is still loading
        `
	})

	// ImageXHandle
	// ha.be.Spr.HandleX
	list.push({
		type: "ha.be.Spr.HandleX",
		perintah: "ha.be.Spr.HandleX",
		message0: "Image %2 get handle X position %1",
		args: {
			dummy: '',
			sprite: {},
		},
		tooltip: "Return the image handle X position",
		output: EOutput.Number,
		inputsInline: true
	})

	// ImageYHandle
	// ha.be.Spr.HandleY
	list.push({
		type: "ha.be.Spr.HandleY",
		perintah: "ha.be.Spr.HandleY",
		message0: "image %2 get handle Y position %1",
		args: {
			dummy: '',
			sprite: {},
		},
		tooltip: "return the image-handle Y position",
		output: EOutput.Number,
		inputsInline: true
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
		tooltip: "return true if two images are collided at the position",
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

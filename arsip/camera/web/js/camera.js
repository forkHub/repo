let imgDrag = false; //img is dragged or not
let imgDragX = 0; //img x position when dragged
let imgDragY = 0; //img y position when dragged
let ratio = 0;
let w2 = 0;
let normalFl = false;
let gw = 800;
let gh = 400;
let boxIdx = 0;
const M_IDLE = 'idle';
const M_PENCET = 'pencet';
const M_DRAG = 'drag';
// const M_DRAG: string = 'drag';
let mouseState = '';
let debugEl;
async function Start() {
    Graphics(gw, gh);
    await load();
    await gantiGambar('./img/depan.jpg', -1200);
    debugEl = ha.comp.Util.getEl('div.debug');
}
function normalize() {
    // let b: boolean = true;
    // if (b) return;
    if (spot.gbr.x > gw) {
        spot.gbr.x -= w2;
        // for (let i: number = 0; i < spot.tbl.length; i++) {
        // 	let tbl: ITombol = spot.tbl[i];
        // 	tbl.x -= w2;
        // }
        // console.log('normalize >');
        // console.log('w2 ' + w2);
        // console.log('img x ' + spot.gbr.x);
    }
    else if ((spot.gbr.x + w2) < 0) {
        spot.gbr.x += w2;
        // for (let i: number = 0; i < spot.tbl.length; i++) {
        // 	let tbl: ITombol = spot.tbl[i];
        // 	tbl.x += w2;
        // }
        // console.log('normalize <');
        // console.log('w2 ' + w2);
        // console.log('img x ' + spot.gbr.x);
    }
}
function getBox() {
    boxIdx++;
    if (boxIdx >= spot.tbl.length) {
        boxIdx = 0;
    }
    // console.log('get box ' + boxIdx);
}
async function Loop() {
    Cls();
    if (InputDown()) {
        mouseState = M_PENCET;
        imgDrag = true;
        imgDragX = spot.gbr.x;
    }
    else {
        if (mouseState == M_PENCET) {
            mouseState = M_IDLE;
            // console.log('hit');
            // await checkHit();
        }
        if (imgDrag) {
            imgDrag = false;
            imgDrag = false;
            spot.gbr.x = imgDragX;
            // spot.img.y = imgDragY;
            normalize();
        }
    }
    // Input
    if (InputDrag() && imgDrag) {
        imgDragX = spot.gbr.x + InputDragX();
        if (mouseState == M_PENCET) {
            mouseState = M_DRAG;
        }
    }
    gambar();
    if (InputHit() > 0) {
        console.log('hit: x: ' + (InputX() - spot.gbr.x) + '/y: ' + InputY());
        await checkHit();
    }
    //debug
    // let str: string = '';
    // str += 'img x: ' + spot.img.x + '<br/>';
    // debugEl.innerHTML = str;
}
function geser(jml) {
    // let b: boolean = true;
    // if (b) return;
    // console.log('geser' + jml);
    spot.gbr.x = jml;
    imgDragX = spot.gbr.x;
    imgDragY = 0;
    // for (let i: number = 0; i < spot.tbl.length; i++) {
    // 	let tbl: ITombol = spot.tbl[i];
    // 	tbl.x = spot.img.x + tbl.x;
    // }
    normalize();
}
async function load() {
    if (!spot.gbr.img) {
        ha.comp.loading.tampil();
        spot.gbr.img = await LoadImage(spot.gbr.url);
        await ha.comp.Util.delay(500);
    }
    for (let i = 0; i < spot.tbl.length; i++) {
        let tbl = spot.tbl[i];
        if (!tbl.img) {
            ha.comp.loading.tampil();
            tbl.img = await LoadImage(tbl.url);
            await ha.comp.Util.delay(500);
        }
    }
    ratio = gh / spot.gbr.img.height;
    ResizeImage(spot.gbr.img, Math.ceil(spot.gbr.img.width * ratio), Math.ceil(spot.gbr.img.height * ratio));
    w2 = Math.ceil(spot.gbr.img.width * ratio);
}
function gambar() {
    DrawImage(spot.gbr.img, imgDragX, 0);
    DrawImage(spot.gbr.img, imgDragX - w2, 0);
    DrawImage(spot.gbr.img, imgDragX + w2, 0);
    for (let i = 0; i < spot.tbl.length; i++) {
        let tbl = spot.tbl[i];
        try {
            DrawImage(tbl.img, imgDragX + tbl.x, tbl.y);
            DrawImage(tbl.img, imgDragX + tbl.x - w2, tbl.y);
            DrawImage(tbl.img, imgDragX + tbl.x + w2, tbl.y);
        }
        catch (e) {
            console.log('idx ' + i);
            throw Error();
        }
    }
}
async function checkHit() {
    for (let i = 0; i < spot.tbl.length; i++) {
        let tbl = spot.tbl[i];
        let inputX = InputX() - spot.gbr.x;
        if (ImageDotCollide(tbl.img, tbl.x, tbl.y, inputX, InputY())) {
            //collide tombol
            console.log('collide tombol normal');
            await gantiGambar(tbl.target, tbl.geser);
        }
        else if (ImageDotCollide(tbl.img, tbl.x, tbl.y, inputX - w2, InputY())) {
            //collide tombol
            console.log('collide tombol normal');
            await gantiGambar(tbl.target, tbl.geser);
        }
        else if (ImageDotCollide(tbl.img, tbl.x, tbl.y, inputX + w2, InputY())) {
            //collide tombol
            console.log('collide tombol normal');
            await gantiGambar(tbl.target, tbl.geser);
        }
    }
}
async function gantiGambar(gbr, geserJml) {
    for (let i = 0; i < spots.length; i++) {
        let spotItem = spots[i];
        spotItem.gbr.x = 0;
        if (spotItem.gbr.url == gbr) {
            spot = spotItem;
            await load();
            geser(geserJml);
            gambar();
            setTimeout(() => {
                ha.comp.loading.detach();
            }, 500);
            return;
        }
    }
    throw Error('gbr tidak ketemu ' + gbr);
}
/**
 * Wrapper
 */
var ha;
(function (ha) {
    var blijs;
    (function (blijs_1) {
        class Blijs {
            init() {
                ha.blitz.main.canvasInit();
                ha.input.init(ha.blitz.main.canvasAktif);
                window.onresize = async () => {
                    ha.blitz.main.windowResize();
                };
                ha.blitz.main.windowResize();
                let _window = window;
                setTimeout(() => {
                    if (typeof _window.Start == "function") {
                        _window.Start()
                            .then(() => {
                            ha.blitz.main.repeat();
                        })
                            .catch((e) => {
                            console.error(e);
                        });
                    }
                    else {
                        console.warn('start not found');
                        ha.blitz.main.repeat();
                    }
                }, 0);
            }
        }
        blijs_1.blijs = new Blijs();
    })(blijs = ha.blijs || (ha.blijs = {}));
})(ha || (ha = {}));
//TODO: diubah, di handle oleh yang panggil
window.onload = () => {
    ha.blitz.main.canvasInit();
    ha.input.init(ha.blitz.main.canvasAktif);
    window.onresize = async () => {
        ha.blitz.main.windowResize();
    };
    ha.blitz.main.windowResize();
    let _window = window;
    setTimeout(() => {
        if (typeof _window.Start == "function") {
            _window.Start()
                .then(() => {
                ha.blitz.main.repeat();
            })
                .catch((e) => {
                console.error(e);
            });
        }
        else {
            console.warn('start not found');
            ha.blitz.main.repeat();
        }
    }, 0);
};
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Main {
            constructor() {
                this._fps = 1000 / 30;
                this._canvasAr = [];
                this.windowResize = () => {
                    // console.debug('window on resize');
                    let canvas = ha.blitz.main._canvasAktif.canvas;
                    let cp = ha.blitz.main._canvasAktif.canvas.width;
                    let cl = ha.blitz.main._canvasAktif.canvas.height;
                    let wp = window.innerWidth;
                    let wl = window.innerHeight;
                    let ratio = Math.min((wp / cp), (wl / cl));
                    let cp2 = Math.floor(cp * ratio);
                    let cl2 = Math.floor(cl * ratio);
                    ha.blitz.main._canvasAktif.scaleX = ratio;
                    ha.blitz.main._canvasAktif.scaleY = ratio;
                    canvas.style.width = cp2 + 'px';
                    canvas.style.height = cl2 + 'px';
                    canvas.style.top = ((wl - cl2) / 2) + 'px';
                    canvas.style.left = ((wp - cp2) / 2) + 'px';
                    // console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
                };
                this.loop = async () => {
                    let _window = window;
                    if (typeof _window.Loop == 'function') {
                        await _window.Loop();
                    }
                };
                this.repeat = () => {
                    this.loop()
                        .then(() => {
                        setTimeout(() => {
                            requestAnimationFrame(this.repeat);
                        }, ha.blitz.main._fps);
                    }).
                        catch((e) => {
                        console.error(e);
                    });
                };
            }
            buatCanvas(buffer) {
                let canvasEl = window.document.body.querySelector(`canvas.${buffer}`);
                let canvas = {
                    canvas: canvasEl,
                    ctx: canvasEl.getContext('2d'),
                    height: canvasEl.height,
                    scaleX: 1,
                    scaleY: 1,
                    width: canvasEl.width,
                    frameH: canvasEl.height,
                    frameW: canvasEl.width,
                    handleX: 0,
                    handleY: 0,
                    img: null,
                    isAnim: false,
                    rotation: 0,
                    rect: ha.rect.create()
                };
                return canvas;
            }
            canvasInit() {
                let canvas = this.buatCanvas('back-buffer');
                this._canvasAr.push(canvas);
                canvas = this.buatCanvas('front-buffer');
                this._canvasAr.push(canvas);
                ha.blitz.main.canvasAktif = canvas;
            }
            get canvasAktif() {
                return this._canvasAktif;
            }
            set canvasAktif(value) {
                this._canvasAktif = value;
            }
            get canvasAr() {
                return this._canvasAr;
            }
            set canvasAr(value) {
                this._canvasAr = value;
            }
            get origin() {
                return this._origin;
            }
            set origin(value) {
                this._origin = value;
            }
            get fps() {
                return this._fps;
            }
            set fps(value) {
                this._fps = value;
            }
        }
        blitz.main = new Main();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Image {
            constructor() {
                this.loadImage = async (url) => {
                    return new Promise((resolve, reject) => {
                        let image2 = document.createElement('img');
                        image2.onload = () => {
                            resolve(image2);
                        };
                        image2.src = url;
                        image2.onerror = (e) => {
                            console.error('error loading image: ' + url);
                            reject(e);
                        };
                    });
                };
            }
            resetImageRect(img) {
                let rect = img.rect;
                let p;
                p = rect.vs[0];
                p.x = 0;
                p.y = 0;
                p = rect.vs[1];
                p.x = img.frameW;
                p.y = 0;
                p = rect.vs[2];
                p.x = img.frameW;
                p.y = img.frameH;
                p = rect.vs[3];
                p.x = 0;
                p.y = img.frameH;
            }
            rectToImageTransform(image, x, y) {
                let rect = image.rect;
                let p;
                let x2 = image.frameW * image.scaleX;
                let y2 = image.frameH * image.scaleY;
                //scale
                p = rect.vs[1];
                p.x = x2;
                p.y = 0;
                p = rect.vs[2];
                p.x = x2;
                p.y = y2;
                p = rect.vs[3];
                p.x = 0;
                p.y = y2;
                //translate
                ha.rect.translate(rect, x, y);
                ha.rect.translate(rect, -image.handleX, -image.handleY);
                //rotate
                ha.rect.rotate(rect, image.rotation, x, y);
            }
        }
        blitz.image = new Image();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
///<reference path="../ha/blitz/Window.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
/**
 * IMAGE
 */
//TODO: test
const CreateImage = (w = 32, h = 32, frameW = 32, frameH = 32) => {
    let canvas = document.createElement('canvas');
    let img;
    canvas.width = w;
    canvas.height = h;
    let rect = ha.rect.create(0, 0, frameW, frameH);
    img = {
        width: w,
        height: h,
        img: null,
        frameH: frameH,
        frameW: frameW,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        isAnim: false,
        scaleX: 1,
        scaleY: 1,
        canvas: canvas,
        ctx: canvas.getContext('2d'),
        rect: rect
    };
    return img;
};
const CopyImage = (src) => {
    return {
        canvas: src.canvas,
        ctx: src.ctx,
        frameH: src.frameH,
        frameW: src.frameW,
        handleX: src.handleX,
        handleY: src.handleY,
        height: src.height,
        img: src.img,
        isAnim: src.isAnim,
        rect: ha.rect.copy(src.rect),
        rotation: src.rotation,
        scaleX: src.scaleX,
        scaleY: src.scaleY,
        width: src.width
    };
};
/* TODO [next]:
 * skip drawing outside
 * image blitting
*/
const DrawImage = (img, x = 0, y = 0, frame = 0) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    let jmlH;
    let jmlV;
    let frameX;
    let frameY;
    // let rect: IRect = img.rect;
    jmlH = Math.floor(img.width / img.frameW);
    jmlV = Math.floor(img.height / img.frameH);
    frameX = (frame % jmlH);
    frameY = Math.floor(frame / jmlV);
    frameX *= img.frameW;
    frameY *= img.frameH;
    frameX = Math.floor(frameX);
    frameY = Math.floor(frameY);
    let x2 = Math.floor(x);
    let y2 = Math.floor(y);
    let w2 = Math.floor(img.frameW * img.scaleX);
    let h2 = Math.floor(img.frameH * img.scaleY);
    x2 -= (img.handleX);
    y2 -= (img.handleY);
    if (img.rotation != 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(img.rotation * (Math.PI / 180));
        ctx.drawImage(img.img, frameX, frameY, img.frameW, img.frameH, -img.handleX, -img.handleY, w2, h2);
        ctx.restore();
    }
    else {
        ctx.drawImage(img.canvas, frameX, frameY, img.frameW, img.frameH, x2, y2, w2, h2);
    }
};
//TODO: test
const GrabImage = (img, x = 0, y = 0) => {
    img.ctx.drawImage(ha.blitz.main.canvasAktif.canvas, x, y, img.width, img.height, 0, 0, img.width, img.height);
};
const HandleImage = (img, x = 0, y = 0) => {
    img.handleX = x;
    img.handleY = y;
};
const ImageWidth = (img) => { return img.frameW * img.scaleX; };
const ImageHeight = (img) => { return img.frameH * img.scaleY; };
const ImageXHandle = (img) => { return img.handleX; };
const ImageYHandle = (img) => { return img.handleY; };
//TODO:
const ImageOverlap = () => { };
const ImageCollide = (img1, x1, y1, img2, x2, y2) => {
    ha.blitz.image.resetImageRect(img1);
    ha.blitz.image.rectToImageTransform(img1, x1, y1);
    ha.blitz.image.resetImageRect(img2);
    ha.blitz.image.rectToImageTransform(img2, x2, y2);
    return ha.rect.collide(img1.rect, img2.rect);
};
const ImageDotCollide = (img1, x1, y1, x2, y2) => {
    ha.blitz.image.resetImageRect(img1);
    ha.blitz.image.rectToImageTransform(img1, x1, y1);
    return ha.rect.collideDot(img1.rect, x2, y2);
};
//
const ImageBoundOverlap = () => {
    return false; //TODO:
};
const MidHandle = (img) => {
    img.handleX = Math.floor((img.frameW * img.scaleX) / 2);
    img.handleY = Math.floor((img.frameH * img.scaleY) / 2);
};
const LoadImage = async (url) => {
    let img = await ha.blitz.image.loadImage(url);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let rect;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    rect = ha.rect.create(0, 0, img.naturalWidth, img.naturalHeight);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: img.naturalHeight,
        frameW: img.naturalWidth,
        // width2: img.naturalWidth,
        // height2: img.naturalHeight,
        isAnim: false,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        ctx: ctx,
        canvas: canvas,
        rect: rect
    };
};
const LoadAnimImage = async (url, fw = 32, fh = 32) => {
    let img = await ha.blitz.image.loadImage(url);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let rect;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    rect = ha.rect.create(0, 0, fw, fh);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: fw,
        frameW: fh,
        // width2: w,
        // height2: h,
        isAnim: true,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        ctx: ctx,
        canvas: canvas,
        rect: rect
    };
};
const TileImage = (img, x = 0, y = 0, frame = 0) => {
    let jmlH = 0;
    let jmlV = 0;
    let w2 = Math.floor(img.frameW * img.scaleX);
    let h2 = Math.floor(img.frameH * img.scaleY);
    while (x < 0) {
        x += w2;
    }
    while (y < 0) {
        y += h2;
    }
    x -= w2;
    y -= h2;
    frame = Math.floor(frame);
    jmlH = Math.ceil((ha.blitz.main.canvasAktif.width + Math.abs(x)) / w2);
    jmlV = Math.ceil((ha.blitz.main.canvasAktif.height + Math.abs(y)) / h2);
    for (let i = 0; i < jmlH; i++) {
        for (let j = 0; j < jmlV; j++) {
            DrawImage(img, x + (i * w2), y + (j * h2), frame);
        }
    }
};
const ResizeImage = (img, w = 1, h = 1) => {
    img.scaleX = Math.floor(w) / img.frameW;
    img.scaleY = Math.floor(h) / img.frameH;
    // console.log(img);
};
const RotateImage = (img, degree = 0) => {
    img.rotation = degree;
};
const ScaleImage = (img, xScale = 1, yScale = 1) => {
    img.scaleX = xScale;
    img.scaleY = yScale;
};
const GetPixel = (x = 0, y = 0) => {
    try {
        let data = ha.blitz.main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
        let hasil = [];
        hasil.push(data[0]);
        hasil.push(data[1]);
        hasil.push(data[2]);
        hasil.push(data[3]);
        return hasil;
    }
    catch (e) {
        console.error(e);
    }
    return [0, 0, 0];
};
//TODO: dep
const SetColor = (r = 255, g = 255, b = 255, a = 1) => {
    Color(r, g, b, a);
};
const SetPixel = (x = 0, y = 0) => {
    ha.blitz.main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
};
//TODO: next
const ImagePivot = () => { };
const BackgroundImage = () => { };
const MainLayer = () => { };
const CreateLayer = () => { };
const LayerZ = () => { };
//ignored
//const TFormImage = () => { }
//const FeeImage = () => { }
//const DrawImageRect = () => { }
//const ImageBuffer = () => { }
///<reference path="../ha/blitz/Window.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
/*
 * INPUT
 */
const Prompt = (m, def) => {
    let hasil = window.prompt(m, def);
    return hasil;
};
const InputHit = () => {
    let hit = ha.input.inputGlobal.hit;
    ha.input.inputGlobal.hit = 0;
    return hit;
};
const WaitInput = async () => {
    while (true) {
        if (InputHit() > 0)
            return;
        Delay(30);
    }
};
const InputX = () => {
    return ha.input.inputGlobal.x;
};
const InputY = () => {
    return ha.input.inputGlobal.y;
};
const InputDragX = () => {
    return ha.input.inputGlobal.xDrag;
};
const InputDragY = () => {
    return ha.input.inputGlobal.yDrag;
};
const FlushInput = () => {
    ha.input.flush();
};
const InputDown = () => {
    return ha.input.inputGlobal.isDown;
};
const InputDrag = () => {
    return ha.input.inputGlobal.isDrag;
};
/**
 * 	KEYBOARD
 */
const FlushKeys = () => {
    ha.input.flushByInput(ha.input.keybGlobal);
    ha.input.flushByType('keyb');
    ha.input.keybGlobal.key = '';
};
const GetKey = () => {
    return ha.input.keybGlobal.key;
};
const KeyIsDown = (key = '') => {
    if ("" == key) {
        return ha.input.keybGlobal.isDown;
    }
    else {
        let input = ha.input.getInput(key, 'keyb');
        if (input) {
            return input.isDown;
        }
        return false;
    }
};
const KeyHit = (key = '') => {
    if ("" == key) {
        let n = ha.input.keybGlobal.hit;
        ha.input.keybGlobal.hit = 0;
        return (n);
    }
    else {
        let input = ha.input.getInput(key, 'keyb');
        let n = 0;
        if (input) {
            n = input.hit;
            input.hit = 0;
        }
        return n;
    }
};
const WaitKey = async (kode = "") => {
    console.log('wait key: ' + kode);
    let ulang = true;
    while (ulang) {
        if (KeyHit(kode) > 0)
            ulang = false;
        await Delay(30);
    }
    console.log('wait key end');
};
/**
 * MOUSE
 */
//Get Mouse Id of the last pressed mouse
const GetMouse = () => {
    return parseInt(ha.input.mouseGlobal.key);
};
//how many time mouse is hit
const MouseHit = (button = -1) => {
    if (button == -1) {
        //TODO:
    }
    else {
        //TODO:
    }
    return 0;
};
const MouseDown = (key) => {
    key;
    return false;
};
const WaitMouse = () => {
};
const MouseX = () => {
    return 0;
};
const MouseY = () => {
    return 0;
};
const MouseZ = () => {
    return 0;
};
const FlushMouse = () => {
};
//MouseDragX
//MouseDragY
//MouseDragAngle
//MouseUp
/**
 * INTERFACE
*/
///<reference path="../ha/blitz/Window.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
/*
 * 	GRAPHICS
 */
//TODO: dipindahin ke tempat yang bener
const Cls = (r = 0, g = 0, b = 0, alpha = 1) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fillRect(0, 0, ha.blitz.main.canvasAktif.width, ha.blitz.main.canvasAktif.height);
};
const BackBuffer = () => { };
const Color = (r = 0, g = 0, b = 0, a = 1) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
};
const ColorRed = () => { };
const ColorBlue = () => { };
const ColorGreen = () => { };
const ClsColor = () => { };
const CopyPixel = () => { };
const CopyRect = () => { };
const FrontBuffer = () => { };
const GetColor = () => { };
const Graphics = (width = 320, height = 240, gl = true, pixel = true) => {
    let canvas = ha.blitz.main.canvasAktif;
    canvas.canvas.width = width;
    canvas.canvas.height = height;
    canvas.canvas.style.width = 320 + 'px';
    canvas.canvas.style.height = 240 + 'px';
    canvas.width = width;
    canvas.height = height;
    if (gl) {
        ha.blitz.main.canvasAktif.canvas.classList.add('gl');
    }
    else {
        ha.blitz.main.canvasAktif.canvas.classList.remove('gl');
    }
    if (pixel) {
        ha.blitz.main.canvasAktif.canvas.classList.add('pixel');
    }
    ha.blitz.main.windowResize();
};
const GraphicsBuffer = () => { };
const Line = (x1, y1, x2, y2) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);
    x2 = Math.floor(x2);
    y2 = Math.floor(y2);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};
const Origin = () => { };
const Oval = () => { };
const Rect = (x1, y1, x2, y2) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
};
const SetBuffer = (buffer) => {
    ha.blitz.main.canvasAktif = buffer;
};
//TODO: dep
const WritePixel = () => { };
const ReadPixel = () => { };
const Plot = () => { };
///<reference path="../ha/blitz/Window.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
///<reference path="../ha/blitz/Window.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
///<reference path="../ha/blitz/Window.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
const Delay = async (m = 0) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, m);
    });
};
const FPS = (n) => {
    ha.blitz.main.fps = Math.floor(1000 / n);
    if (n >= 60) {
        ha.blitz.main.fps = 0;
    }
};
//TODO: masukin ke lib, kepanjangen
const Dim = (...args) => {
    if (0 == args.length) {
        return [];
    }
    else if (1 == args.length) {
        let hasil = [];
        for (let i = 0; i < args[0]; i++) {
            hasil[i] = {};
        }
        return hasil;
    }
    else if (2 == args.length) {
        if (typeof args[1] == 'number') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = {};
                }
            }
            return hasil;
        }
        else if (typeof args[1] == 'function') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = {};
                args[1](hasil[i]);
            }
            return hasil;
        }
        else if (typeof args[1] == 'object') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                try {
                    hasil[i] = JSON.parse(JSON.stringify(args[1]));
                }
                catch (e) {
                    console.error(e);
                    hasil[i] = {};
                }
            }
            return hasil;
        }
        else {
            throw new Error('second argument is invalid, expected number or function or object');
        }
    }
    else if (3 == args.length) {
        if (typeof args[2] == 'function') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = {};
                    args[2](hasil[i][j]);
                }
            }
            return hasil;
        }
        else if (typeof args[2] == 'object') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = JSON.parse(JSON.stringify(args[2]));
                }
            }
            return hasil;
        }
        else {
            throw Error('expecting third argument is a function or object');
        }
    }
    else {
        throw Error('arguments invalid, expected max arguments: 3');
    }
};
const Millisecs = () => {
    return Date.now();
};
/**
 * TEXTS
 */ 
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        // export function createComponent(template: string): BaseComponent {
        // 	let comp: BaseComponent = new BaseComponent();
        // 	comp.template = template;
        // 	comp.build();
        // 	return comp;
        // }
        class BaseComponent {
            constructor() {
                this._template = '';
                this._elHtml = document.createElement('div');
            }
            // protected get template(): string {
            // 	return this._template;
            // }
            // protected set template(value: string) {
            // 	this._template = value;
            // }
            static buat(temp) {
                let view = new BaseComponent();
                view.build(temp);
                return view;
            }
            async loadTemplate(f) {
                let http = await comp.Util.Ajax('get', f, '');
                if (200 == http.status) {
                    return http.responseText;
                }
                else {
                    throw new Error(http.responseText);
                }
            }
            destroy() {
                this.detach();
                while (this._elHtml.firstChild) {
                    this._elHtml.removeChild(this._elHtml.firstChild);
                }
                this._elHtml = null;
            }
            attach(parent) {
                parent.appendChild(this._elHtml);
                this._parent = parent;
            }
            detach() {
                // console.log('loading detach');
                // console.log(this._elHtml.parentElement);
                if (this._elHtml.parentElement) {
                    this._elHtml.parentElement.removeChild(this._elHtml);
                    return true;
                }
                return false;
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            build(temp = '') {
                let div = document.createElement('div');
                let el;
                if (temp && temp != '') {
                    this._template = temp;
                }
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                if (!this._elHtml) {
                    console.log(div);
                    console.log(this._template);
                    throw new Error('');
                }
            }
            getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            // getElFromDoc(query: string): HTMLElement {
            // 	let el: HTMLElement;
            // 	el = document.querySelector(query);
            // 	if (!el) throw new Error();
            // 	return el;
            // }
            get elHtml() {
                return this._elHtml;
            }
        }
        comp.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Dialog extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='comp dialog'>
					<div class='box'>
						<p class='deskripsi'>Contoh dialog </p>
						<button class="btn btn-primary ok">OK</button>
					</div>
				</div>
				`;
                this.build();
            }
            init() {
                this.detach();
            }
            tampil(pesan = '', def = true) {
                ha.comp.Util.stackTrace();
                this.p.innerHTML = pesan;
                if (def) {
                    this.okTbl.onclick = () => {
                        this.detach();
                    };
                }
                this.attach(document.body);
                this._elHtml.style.display = 'block';
            }
            get okTbl() {
                return this.getEl('button.ok');
            }
            get p() {
                return this.getEl('p');
            }
        }
        comp.dialog = new Dialog();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Loading extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='loading'>
					<div class='box'>
						<img src=''/>
						<p>Memuat ...</p> 
					</div> 
				</div>
			`;
                this.build();
            }
            tampil() {
                console.log('loading tampil');
                this.attach(document.body);
            }
        }
        comp.loading = new Loading();
        console.log('exporting loading: ' + comp.loading);
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuKontek {
            constructor() {
                this.view = new View();
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'inline-block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.elHtml.appendChild(button);
            }
        }
        comp.MenuKontek = MenuKontek;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-context'>
				</div>
			`;
                this.build();
                this._elHtml.style.wordBreak = 'no-wrap';
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuPopup {
            constructor() {
                this.view = new View();
            }
            destroy() {
                this.view.destroy();
            }
            buatTombol2(t) {
                t.forEach((item) => {
                    this.buatTombol(item);
                });
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.box.appendChild(button);
            }
        }
        comp.MenuPopup = MenuPopup;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-popup' style="position:fixed; top:0px; left:0px; right:0px; bottom:0px; z-index:1000; background-color: rgba(0,0,0,.3)">
					<div class='box cont' style="position:fixed; bottom:0px; left:0px; right:0px">
					</div>
				</div>
			`;
                this.build();
                this.box.style.backgroundColor = 'white';
                this.box.style.padding = '8px';
                this.box.style.textAlign = 'center';
                this._elHtml.onclick = () => {
                    this.detach();
                };
            }
            get box() {
                return this.getEl('div.box.cont');
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Util {
            static createEl(str) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = str;
                el = div.firstElementChild;
                if (!el) {
                    console.log(div);
                    console.log(str);
                    throw new Error('');
                }
                return el;
            }
            static getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            static getEl(query, parent = null, err = true) {
                let el;
                if (!parent)
                    parent = document.body;
                el = parent.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(parent);
                    console.log(query);
                    if (err) {
                        throw new Error('query not found ');
                    }
                    else {
                        return null;
                    }
                }
            }
            static id() {
                return Date.now();
            }
            static async delay(m = 10) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, m);
                });
            }
            static stackTrace() {
                try {
                    throw Error('');
                }
                catch (e) {
                    console.error(e);
                }
            }
            static bersihDiv(div) {
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
            }
            //default error
            static error(e) {
                console.error(e);
                comp.dialog.tampil(e.message);
            }
            //shared
            static kirimWa(teks) {
                return "whatsapp://send?text=" + teks;
            }
            static getUrl(url, params) {
                let urlHasil = url;
                console.group('get url');
                console.log('url: ' + url);
                console.log('params: ' + JSON.stringify(params));
                params.forEach((item) => {
                    console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
                    urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
                    console.log('item: ' + item);
                    console.log('url: ' + urlHasil);
                });
                console.log('url hasil: ' + urlHasil);
                console.groupEnd();
                return urlHasil;
            }
            static build(temp) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = temp;
                el = div.firstElementChild;
                // this._elHtml = el;
                if (!el) {
                    console.log(div);
                    console.log(temp);
                    throw new Error('');
                }
                return el;
            }
            static async AjaxLogin(type, urlServer, dataStr, loginUrl, pf = null) {
                let xml;
                xml = await this.Ajax(type, urlServer, dataStr, pf);
                if (401 == xml.status) {
                    window.top.location.href = loginUrl;
                    return null;
                }
                else {
                    return xml;
                }
            }
            static async Ajax2(type, url, dataStr, pf = null) {
                let x = await this.Ajax(type, url, dataStr, pf);
                if (x.status == 200 || x.status == 0) {
                    return x.responseText;
                }
                console.log('error status code: ' + x.status);
                throw Error(x.responseText);
            }
            static async Ajax(type, url, dataStr, pf = null) {
                return new Promise((resolve, reject) => {
                    try {
                        console.group('send data');
                        // console.log(dataStr);
                        console.log("type " + type);
                        comp.loading.attach(document.body);
                        let xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            comp.loading.detach();
                            resolve(xhr);
                        };
                        xhr.onerror = (e) => {
                            console.log('xhr error');
                            console.log(e);
                            comp.loading.detach();
                            reject(new Error(e.message));
                        };
                        xhr.onprogress = (p) => {
                            if (pf) {
                                pf(p);
                            }
                        };
                        xhr.open(type, url + "", true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        // xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
                        // xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));
                        xhr.send(dataStr);
                        // console.log("type " + type);
                        // console.log("url " + url);
                        console.groupEnd();
                    }
                    catch (e) {
                        console.log('Util error');
                        console.log(e);
                        comp.loading.detach();
                        reject(new Error(e.message));
                    }
                });
            }
        }
        Util.sUserId = 'user_id';
        Util.sLevel = 'level';
        Util.sFilter = 'filter';
        Util.storageId = 'xyz.hagarden.tugas';
        comp.Util = Util;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Input {
        constructor() {
            this._inputs = []; //any input,
            this._event = new Event();
            this.pos = (cx, cy, buffer, canvasScaleX, canvasScaleY) => {
                let rect = buffer.canvas.getBoundingClientRect();
                let poslx = Math.floor((cx - rect.x) / canvasScaleX);
                let posly = Math.floor((cy - rect.y) / canvasScaleY);
                return {
                    x: poslx,
                    y: posly
                };
            };
            this._touchGlobal = this.def();
            this._mouseGlobal = this.def();
            this._keybGlobal = this.def();
            this._inputGlobal = this.def();
            this._touchGlobal.type = 'touch';
            this._keybGlobal.type = 'keyb';
            this._mouseGlobal.type = 'mouse';
        }
        getMouseKey(e) {
            if (e.pointerType == 'touch') {
                return e.pointerId + '';
            }
            else if (e.pointerType == 'mouse') {
                return e.button + '';
            }
            throw Error('');
        }
        //TODO: diganti canvas dan info yang lebih bagus
        init(buffer) {
            buffer.canvas.onpointerdown = (e) => {
                e.stopPropagation();
                // e.preventDefault();
                let pos = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);
                let key = this.getMouseKey(e);
                let input = ha.input.baru(key, e.pointerType);
                ha.input.event.down(input, key, e.pointerType, pos);
                ha.input.event.down(this._inputGlobal, key, e.pointerType, pos);
                if ("mouse" == e.pointerType)
                    ha.input.event.down(this._mouseGlobal, key, 'mouse', pos);
                if ("touch" == e.pointerType)
                    ha.input.event.down(this._touchGlobal, key, 'touch', pos);
            };
            buffer.canvas.onpointermove = (e) => {
                e.stopPropagation();
                let input = this.baru(e.button + '', e.pointerType);
                ha.input.event.move(input, buffer, e);
                ha.input.event.move(this.inputGlobal, buffer, e);
                if (e.pointerType == 'touch')
                    ha.input.event.move(ha.input.touchGlobal, buffer, e);
                if (e.pointerType == 'mouse')
                    ha.input.event.move(ha.input.mouseGlobal, buffer, e);
            };
            buffer.canvas.onpointerout = (e) => {
                e.stopPropagation();
                let input = ha.input.baru(e.button + '', e.pointerType);
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                if (e.pointerType == 'touch')
                    ha.input.event.up(ha.input.touchGlobal);
                if (e.pointerType == 'mouse')
                    ha.input.event.up(ha.input.mouseGlobal);
            };
            buffer.canvas.onpointercancel = (e) => {
                e.stopPropagation();
                e.preventDefault();
            };
            buffer.canvas.onpointerup = (e) => {
                e.stopPropagation();
                let input = ha.input.baru(e.button + '', e.pointerType);
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                if (e.pointerType == 'touch')
                    ha.input.event.up(ha.input.touchGlobal);
                if (e.pointerType == 'mouse')
                    ha.input.event.up(ha.input.mouseGlobal);
            };
            window.onkeydown = (e) => {
                // e.stopPropagation();
                // e.preventDefault();
                let input = ha.input.baru(e.key + '', 'keyb');
                ha.input.event.down(input, e.key, 'keyb', ha.point.create());
                ha.input.event.down(this.inputGlobal, e.key, 'keyb', ha.point.create());
                ha.input.event.down(this._keybGlobal, e.key, 'keyb', ha.point.create());
                // console.log('keydown');
            };
            window.onkeyup = (e) => {
                // e.stopPropagation();
                let input = ha.input.baru(e.key + '', 'keyb');
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                ha.input.event.up(this._keybGlobal);
                // ha.blitz.input.event.keyUp(input, e);
                // ha.blitz.input.event.keyUp(blitzConf.input, e);
            };
            // window.onresize = async (): Promise<void> => {
            // 	ha.blitz.main.windowResize();
            // }
        }
        def() {
            return {
                id: 0,
                isDown: false,
                isDrag: false,
                // isHit: false,
                isTap: false,
                key: '',
                timerEnd: 0,
                timerStart: 0,
                type: '',
                x: 0,
                xDrag: 0,
                xStart: 0,
                y: 0,
                yDrag: 0,
                yStart: 0,
                hit: 0
            };
        }
        reset(input) {
            input.id = 0;
            input.isDown = false;
            input.isDrag = false;
            // input.isHit = false;
            input.isTap = false;
            input.key = '';
            input.timerEnd = 0;
            input.timerStart = 0;
            input.type = '';
            input.x = 0;
            input.y = 0;
            input.xDrag = 0;
            input.yDrag = 0;
            input.xStart = 0;
            input.yStart = 0;
        }
        flush() {
            while (this.inputs.length > 0) {
                this.inputs.pop();
            }
            this.flushByInput(this._inputGlobal);
            this.flushByInput(this._mouseGlobal);
            this.flushByInput(this._touchGlobal);
            this.flushByInput(this._keybGlobal);
        }
        flushByType(type) {
            this._inputs.forEach((input) => {
                if (type == input.type) {
                    this.flushByInput(input);
                }
            });
        }
        flushByInput(input) {
            input.isDown = false;
            input.isDrag = false;
            // input.isHit = false;
            input.isTap = false;
            input.hit = 0;
        }
        getInput(key, inputType) {
            let inputHasil;
            for (let i = 0; i < this.inputs.length; i++) {
                let input = this.inputs[i];
                if (input.type == inputType && input.key == key) {
                    inputHasil = input;
                    return inputHasil;
                }
            }
            return inputHasil;
        }
        baru(e, inputType) {
            let inputBaru = this.getInput(e, inputType);
            if (!inputBaru) {
                inputBaru = {
                    key: e,
                    type: inputType,
                    // down: [],
                    // hit: [],
                    isDown: false,
                    isDrag: false,
                    // isHit: false,
                    isTap: false,
                    timerEnd: 0,
                    timerStart: 0,
                    x: 0,
                    xDrag: 0,
                    xStart: 0,
                    y: 0,
                    yDrag: 0,
                    yStart: 0,
                    id: 0,
                    hit: 0
                };
                this.inputs.push(inputBaru);
                // console.log('new input:');
                // console.log(inputBaru);
            }
            return inputBaru;
        }
        get inputs() {
            return this._inputs;
        }
        get event() {
            return this._event;
        }
        get touchGlobal() {
            return this._touchGlobal;
        }
        get mouseGlobal() {
            return this._mouseGlobal;
        }
        get keybGlobal() {
            return this._keybGlobal;
        }
        get inputGlobal() {
            return this._inputGlobal;
        }
    }
    class Event {
        move(input, canvas, e) {
            let pos = ha.input.pos(e.clientX, e.clientY, canvas, canvas.scaleX, canvas.scaleY);
            input.x = pos.x;
            input.y = pos.y;
            input.id = e.pointerId;
            if (input.isDown) {
                input.isDrag = true;
                input.xDrag = input.x - input.xStart;
                input.yDrag = input.y - input.yStart;
            }
        }
        down(input, key, type, pos) {
            if (!input.isDown) {
                input.hit++;
            }
            input.xStart = pos.x;
            input.yStart = pos.y;
            input.x = pos.x;
            input.y = pos.y;
            input.isDown = true;
            input.isTap = false;
            input.isDrag = false;
            // input.isHit = true;
            input.key = key;
            input.type = type;
            input.timerStart = Date.now();
        }
        up(input2) {
            // input2.id = e.pointerId;
            input2.isDown = false;
            input2.isDrag = false;
            input2.timerEnd = Date.now();
            input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);
        }
    }
    ha.input = new Input();
})(ha || (ha = {}));
/**
 * INTERFACE
*/
var ha;
(function (ha) {
    class Line {
        createLine(m, b) {
            return {
                b: b,
                m: m,
                y: 0
            };
        }
        fromPos() {
        }
        fromVec() {
        }
        fromSeg() {
        }
        lineCrossPos(line, line2) {
            line;
            line2;
            return null;
        }
    }
    ha.line = new Line();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Point {
        create(x = 0, y = 0) {
            return {
                x: x,
                y: y
            };
        }
        // boundPosData(p: IV2D, bound: IRect): IV2D {
        // 	let h: number = 0;
        // 	let v: number = 0;
        // 	//TODO: next check boundary rotated
        // 	if (ha.segment.deg(bound.segs[1]) != 0) {
        // 		ha.rect.rotateToHor(bound);
        // 	}
        // 	//check hor
        // 	if (ha.trans.equal(ha.rect.minX(bound), p.x)) {
        // 		v = 1;
        // 	} else if (ha.rect.minX(bound) > p.x) {
        // 		v = 0;
        // 	} else if (ha.trans.equal(ha.rect.maxX(bound), p.x)) {
        // 		v = 3;
        // 	} else if (ha.rect.maxX(bound) < p.x) {
        // 		v = 4;
        // 	}
        // 	else {
        // 		h = 2;
        // 	}
        // 	//check ver
        // 	if (ha.trans.equal(ha.rect.minY(bound), p.y)) {
        // 		h = 1;
        // 	} else if (ha.rect.minY(bound) > p.y) {
        // 		h = 0;
        // 	} else if (ha.trans.equal(ha.rect.maxY(bound), p.y)) {
        // 		h = 3;
        // 	} else if (ha.rect.maxY(bound) < p.y) {
        // 		h = 4;
        // 	}
        // 	else {
        // 		h = 2;
        // 	}
        // 	return ha.point.create(h, v);
        // }
        copyInfo(p1, p2) {
            p2.x = p1.x;
            p2.y = p1.y;
        }
        copy(p) {
            let h = this.create(p.x, p.y);
            return h;
        }
        // distFromPos(p: IV2D, x: number = 0, y: number = 0): number {
        // 	return ha.trans.dist(p.x, p.y, x, y);
        // }
        // distToSeg(p: IV2D, seg: ISegment): number {
        // 	let seg2: ISegment = ha.segment.getUpSeg(seg);
        // 	let seg2Deg: number = ha.segment.deg(seg2);
        // 	let p2: IV2D = ha.point.copy(p);
        // 	ha.point.rotateRel(p2, seg2.v1.y, seg2.v2.y, -seg2Deg);
        // 	return Math.abs(Math.round(p2.y));
        // }
        equal(p1, p2) {
            if (false == ha.trans.equal(p1.x, p2.x))
                return false;
            if (false == ha.trans.equal(p1.y, p2.y))
                return false;
            return true;
        }
        // scaleRel(p: IV2D, xc: number = 0, yc: number = 0, scaleX: number = 1, scaleY: number = 1): void {
        // 	p.y = xc + (p.y - xc) * scaleX;
        // 	p.y = yc + (p.y - yc) * scaleY;
        // }
        translate(p, x = 0, y = 0) {
            p.x += x;
            p.y += y;
        }
        rotateRel(p, xc = 0, yc = 0, deg = 0) {
            ha.trans.rotateRel(p.x, p.y, xc, yc, deg);
            // console.log('rotate rel');
            // console.log('p.x ' + p.x);
            // console.log('p.y ' + p.y);
            // console.log('xc ' + xc);
            // console.log('yc ' + yc);
            // console.log('deg ' + deg);
            // console.log('last x ' + Math.floor(ha.trans.lastX));
            // console.log('last y ' + Math.floor(ha.trans.lastY));
            p.x = ha.trans.lastX;
            p.y = ha.trans.lastY;
            // console.log('p.x ' + p.x);
            // console.log('p.y ' + p.y);
            // console.log('rotate rel end');
        }
    }
    ha.point = new Point();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Rect {
        create(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
            let r = {};
            r.vs = [];
            r.vs.push(ha.point.create(x1, y1));
            r.vs.push(ha.point.create(x2, y1));
            r.vs.push(ha.point.create(x2, y2));
            r.vs.push(ha.point.create(x1, y2));
            r.segs = [];
            r.segs.push(ha.segment.createSeg(r.vs[0], r.vs[1]));
            r.segs.push(ha.segment.createSeg(r.vs[1], r.vs[2]));
            r.segs.push(ha.segment.createSeg(r.vs[2], r.vs[3]));
            r.segs.push(ha.segment.createSeg(r.vs[3], r.vs[0]));
            return r;
        }
        copy(r) {
            // console.log('copy:');
            // console.log(r.vs);
            // let hasil: IRect = this.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
            let hasil = this.create();
            this.copyInfo(r, hasil);
            // console.log(hasil.vs);
            return hasil;
        }
        copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                ha.segment.copyInfo(r1.segs[i], r2.segs[i]);
            }
        }
        collideBound(r1, r2) {
            // console.debug('collide bound');
            if (this.maxX(r1) < this.minX(r2)) {
                // console.debug('maxX gagal');
                return false;
            }
            // console.log('maxx ' + this.maxX(r1));
            // console.log('minx ' + this.minX(r2));
            if (this.minX(r1) > this.maxX(r2)) {
                // console.debug('min x gagal');
                return false;
            }
            if (this.maxY(r1) < this.minY(r2)) {
                // console.debug('max y gagal');
                return false;
            }
            if (this.minY(r1) > this.maxY(r2)) {
                // console.debug('min y gagal');
                return false;
            }
            return true;
        }
        collide(r1, r2) {
            let bound = this.collideBound(r1, r2);
            if (!bound)
                return false;
            for (let i = 0; i < r1.segs.length; i++) {
                for (let j = 0; j < r2.segs.length; j++) {
                    if (ha.segment.collide(r1.segs[i], r2.segs[j])) {
                        return true;
                    }
                }
            }
            return false;
        }
        collideDotBound(r, d) {
            if (d.x < this.minX(r)) {
                // console.log('minx failed');
                return false;
            }
            if (d.x > this.maxX(r)) {
                // console.log('maxX failed');
                // console.log(d);
                // console.log(this.maxX(r));
                // console.log(r.vs);
                return false;
            }
            if (d.y < this.minY(r)) {
                // console.log('minY failed');
                return false;
            }
            if (d.y > this.maxY(r)) {
                // console.log('maxY failed');
                return false;
            }
            return true;
        }
        collideDot(r, x, y) {
            let r2 = ha.rect.copy(r);
            let p = ha.point.create(x, y);
            let d = ha.segment.deg(r2.segs[0]);
            let pRot = r2.vs[0];
            // console.log('d: ' + d);
            // console.log('segment ' + r2.segs[0]);
            // console.log(r2.segs[0]);
            // console.log('rect');
            // console.log(r);
            // console.log(r2);
            if (!this.collideDotBound(r, p)) {
                // console.log('collide bound 1 failed');
                return false;
            }
            ha.rect.rotate(r2, -d, pRot.x, pRot.y);
            ha.point.rotateRel(p, pRot.x, pRot.y, -d);
            if (!this.collideDotBound(r2, p)) {
                // console.log('collide bound 2 failed');
                // console.log('deg ' + d);
                // console.log('rect');
                // console.log(r2);
                return false;
            }
            return true;
        }
        minX(r) {
            let x = r.vs[0].x;
            r.vs.forEach((item) => {
                if (item.x < x)
                    x = item.x;
            });
            return x;
        }
        maxX(r) {
            let x = r.vs[0].x;
            r.vs.forEach((item) => {
                if (item.x > x)
                    x = item.x;
            });
            return x;
        }
        minY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y < y)
                    y = item.y;
            });
            return y;
        }
        maxY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y > y)
                    y = item.y;
            });
            return y;
        }
        scale(r) {
            r;
        }
        translate(rect, x, y) {
            rect.vs.forEach((v) => {
                ha.point.translate(v, x, y);
            });
        }
        rotate(r, deg, xc = 0, yc) {
            r.vs.forEach((p) => {
                ha.point.rotateRel(p, xc, yc, deg);
            });
        }
    }
    ha.rect = new Rect();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Segment {
        createSeg(v1 = { x: 0, y: 0 }, v2 = { x: 0, y: 0 }) {
            return {
                v1: v1,
                v2: v2
            };
        }
        boundCollide(seg1, seg2) {
            if (this.maxX(seg1) < this.minX(seg2))
                return false;
            if (this.minX(seg1) > this.maxX(seg2))
                return false;
            if (this.maxY(seg1) < this.minY(seg2))
                return false;
            if (this.minY(seg1) > this.maxY(seg2))
                return false;
            return true;
        }
        collide(seg1, seg2) {
            let bound = this.boundCollide(seg1, seg2);
            if (!bound)
                return false;
            // let deg: number = this.deg(seg2);
            let seg2Copy = this.copy(seg2);
            let seg1Copy = this.copy(seg1);
            let deg = this.deg(seg2);
            this.rotate(seg2Copy, -deg, seg2.v1.x, seg2.v1.y);
            this.rotate(seg1Copy, -deg, seg2.v1.x, seg2.v1.y);
            if (!this.boundCollide(seg1Copy, seg2Copy))
                return false;
            this.translate(seg1Copy, -seg2.v1.x, -seg2.v1.y);
            this.translate(seg2Copy, -seg2.v1.x, -seg2.v1.y);
            if (!this.crossHor(seg1Copy)) {
                return false;
            }
            let idx = this.xHorIdx(seg1Copy);
            let x = this.getXAtIdx(seg1Copy, idx);
            if (x > this.maxX(seg2Copy))
                return false;
            if (x < this.minX(seg2Copy))
                return false;
            return true;
        }
        copyInfo(seg1, seg2) {
            ha.point.copyInfo(seg1.v1, seg2.v2);
            ha.point.copyInfo(seg1.v2, seg2.v2);
        }
        copy(seg) {
            return {
                v1: ha.point.copy(seg.v1),
                v2: ha.point.copy(seg.v2)
            };
        }
        crossHor(seg) {
            if (ha.segment.maxY(seg) > 0) {
                if (ha.segment.minY(seg) < 0) {
                    return true;
                }
            }
            return false;
        }
        deg(line) {
            let j = line.v2.y - line.v1.y;
            let i = line.v2.x - line.v1.x;
            return ha.trans.deg(i, j);
        }
        // fromPoint(p: IV2D, l: number, deg: number): ISegment {
        // 	let seg: ISegment = ha.segment.createSeg(
        // 		ha.point.create(0, 0),
        // 		ha.point.create(l, 0)
        // 	);
        // 	ha.segment.rotate(seg, deg, 0, 0);
        // 	ha.segment.translate(seg, p.x, p.y);
        // 	return seg;
        // }
        getXAtIdx(seg, idx) {
            return seg.v1.x + (idx * this.vecI(seg));
        }
        getYAtIdx(seg, idx) {
            return seg.v1.y + (idx * this.vecJ(seg));
        }
        // length(seg: ISegment): number {
        // 	let x: number = this.vecI(seg);
        // 	let y: number = this.vecJ(seg);
        // 	return Math.sqrt(x * x + y * y);
        // }
        vecI(seg) {
            return seg.v2.x - seg.v1.x;
        }
        vecJ(seg) {
            return seg.v2.y - seg.v1.y;
        }
        rotate(seg, deg = 0, xc = 0, yc = 0) {
            ha.point.rotateRel(seg.v1, xc, yc, deg);
            ha.point.rotateRel(seg.v2, xc, yc, deg);
        }
        // seg2Vec(seg: ISegment): IV2D {
        // 	return ha.point.create(
        // 		seg.v2.y - seg.v1.y,
        // 		seg.v2.y - seg.v1.y
        // 	);
        // }
        // scale(seg: ISegment, scale: number): void {
        // 	let px: number = seg.v2.x - seg.v1.x;
        // 	let py: number = seg.v2.y - seg.v1.y;
        // 	px *= scale;
        // 	py *= scale;
        // 	seg.v2.x = seg.v1.x + px;
        // 	seg.v2.y = seg.v1.y + py;
        // }
        // scaleTo(seg: ISegment, n: number): void {
        // 	let p: number = ha.segment.length(seg);
        // 	let scale: number = n / p;
        // 	this.scale(seg, scale);
        // }
        // getUpSeg(seg: ISegment): ISegment {
        // 	return {
        // 		v1: ha.point.copy(this.minYP(seg)),
        // 		v2: ha.point.copy(this.maxYP(seg))
        // 	}
        // }
        // minYP(seg: ISegment): IV2D {
        // 	if (seg.v1.y <= seg.v2.y) return seg.v1;
        // 	return seg.v2;
        // }
        // maxYP(seg: ISegment): IV2D {
        // 	if (seg.v1.y >= seg.v2.y) return seg.v1;
        // 	return seg.v2;
        // }
        // minXP(seg: ISegment): IV2D {
        // 	if (seg.v1.y <= seg.v2.y) return seg.v1;
        // 	return seg.v2;
        // }
        // maxXP(seg: ISegment): IV2D {
        // 	if (seg.v1.y >= seg.v2.y) return seg.v1;
        // 	return seg.v2;
        // }
        minX(seg) {
            return Math.min(seg.v1.x, seg.v2.x);
        }
        maxX(seg) {
            return Math.max(seg.v1.x, seg.v2.x);
        }
        minY(seg) {
            return Math.min(seg.v1.y, seg.v2.y);
        }
        maxY(seg) {
            return Math.max(seg.v1.y, seg.v2.y);
        }
        /**
         * whether a point position is on the left side of a segment
         * @param p point
         * @param seg segment
         * @returns 0 = false, 1 = true, 2 = true, on tip
         */
        // isPointOnTheLeftOfSeg(p: IV2D, seg: ISegment): number {
        // 	let bound: IRect = ha.segment.rect(seg);
        // 	let boundPos: IV2D = ha.point.boundPosData(p, bound);
        // 	//check bound
        // 	if (4 == boundPos.x) return 0;
        // 	if (boundPos.y in [0, 4]) return 0;
        // 	if (boundPos.y in [1, 4]) return 2;
        // 	if (ha.trans.equal(p.y, seg.v1.y)) return 2;
        // 	if (ha.trans.equal(p.y, seg.v2.y)) return 2;
        // 	//test 
        // 	let seg2: ISegment = ha.segment.getUpSeg(seg);
        // 	let p2: IV2D = ha.point.copy(p);
        // 	let deg: number = ha.segment.deg(seg2);
        // 	ha.segment.rotateHor(seg2);
        // 	ha.point.rotateRel(p2, seg2.v1.x, seg2.v1.y, deg);
        // 	if (p2.y > 0) return 1;
        // 	return 0;
        // }
        // rect(seg: ISegment): IRect {
        // 	return ha.rect.create(seg.v1.x, seg.v1.y, seg.v2.x, seg.v2.y);
        // }
        /**
         * rotate segment so that it is pararel to horzontal axis based on the first point as center of rotation
         * @param seg
         */
        // rotateHor(seg: ISegment): void {
        // 	let deg: number = ha.segment.deg(seg);
        // 	if (0 == deg) return;
        // 	// console.log('deg ' + deg);
        // 	ha.segment.rotate(seg, -deg, seg.v1.x, seg.v1.y);
        // }
        /**
         * rotate segment so that it is pararel to vertical axis based on the first point as center of rotation
         * @param seg
         */
        // rotateVer(seg: ISegment): void {
        // 	let deg: number = ha.segment.deg(seg);
        // 	if (deg < 90) deg = 90 - deg;
        // 	if (deg > 90) deg = deg - 90;
        // 	if (deg == 90) return;
        // 	ha.segment.rotate(seg, -deg, seg.v1.x, seg.v1.y);
        // }
        translate(seg, x = 0, y = 0) {
            ha.point.translate(seg.v1, x, y);
            ha.point.translate(seg.v2, x, y);
        }
        //tested
        xHorIdx(seg) {
            if (!ha.segment.crossHor(seg))
                return NaN;
            let idx = 0;
            idx = (0 - seg.v1.y) / (seg.v2.y - seg.v1.y);
            return idx;
        }
    }
    ha.segment = new Segment();
})(ha || (ha = {}));
var ha;
(function (ha) {
    //TODO: disederhanakan
    class Transform {
        constructor() {
            this.RAD2DEG = 180.0 / Math.PI;
            this.DEG2RAD = Math.PI / 180.0;
            this._lastX = 0;
            this._lastY = 0;
            //TODO: dihapus
            // rotateFrom(x: number, y: number, tx: number, ty: number, rotNow: number): number {
            // 	let angle: number = this.deg(tx - x, ty - y);
            // 	let angleMin: number = this.degMaxDist(rotNow, angle);
            // 	return angleMin;
            // }
            //TODO: dihapus
            // rotateTo(x: number, y: number, tx: number = 0, ty: number = 0, rotNow: number = 0): number {
            // 	let angle: number = this.deg(tx - x, ty - y);
            // 	let angleMin: number = this.degMinDist(rotNow, angle);
            // 	return angleMin;
            // }
            // moveByDeg(speed: number = 10, deg: number = 10): IV2D {
            // 	deg *= this.DEG2RAD;
            // 	this._lastX = Math.cos(deg) * speed;
            // 	this._lastY = Math.sin(deg) * speed;
            // 	return {
            // 		x: this._lastX,
            // 		y: this._lastY
            // 	}
            // }
        }
        get lastX() {
            return this._lastX;
        }
        get lastY() {
            return this._lastY;
        }
        // clamp(n: number, m: number): number {
        // 	let m2 = Math.abs(m);
        // 	let n2 = Math.abs(n);
        // 	let h = Math.min(n2, m2);
        // 	if (n >= 0) return h;
        // 	return -h;
        // }
        create() {
            return {
                pos: { x: 0, y: 0 },
                scale: { x: 1, y: 1 },
                rotation: 0
            };
        }
        equal(n1, n2, tol = 1) {
            if (Math.abs(n1 - n2) <= tol)
                return true;
            // console.log("equal failed " + Math.abs(n1 - n2) + "/" + Math.abs(n1) + "/" + Math.abs(n2));
            return false;
        }
        quadDeg2(x, y, deg) {
            if (x == 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x > 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x < 0) {
                if (y == 0) {
                    return 180;
                }
                else if (y > 0) {
                    return 180 - Math.abs(deg);
                }
                else if (y < 0) {
                    return 180 + Math.abs(deg);
                }
            }
            throw Error();
        }
        // quadDeg(x: number, y: number): number {
        // 	// console.log('quad x: ' + x + '/y: ' + y);
        // 	if (x == 0) {
        // 		if (y >= 0) {
        // 			return 0; 
        // 		}
        // 		else {
        // 			return 0;
        // 		}
        // 	}
        // 	else if (x > 0) {
        // 		if (y >= 0) {
        // 			return 0;
        // 		}
        // 		else {
        // 			return 0;
        // 		}
        // 	}
        // 	else if (x < 0) {
        // 		if (y > 0) {
        // 			return 90;
        // 		}
        // 		else if (y == 0) {
        // 			return 180;
        // 		}
        // 		else {
        // 			return -90;
        // 		}
        // 	}
        // 	else {
        // 		console.log("error x :" + x + '/y: ' + y);
        // 		throw Error('');
        // 	}
        // }
        deg(x, y) {
            let l;
            let s;
            l = Math.sqrt(x * x + y * y);
            if (l == 0) {
                l = .00001;
            }
            s = y / l;
            s = Math.asin(s);
            s *= this.RAD2DEG;
            // console.log('sudut ' + s);
            s = ha.trans.quadDeg2(x, y, s);
            // console.log('quad ' + s);
            // s = s + q;
            s = this.normalizeDeg(s);
            // console.log('deg x: ' + x + '/y: ' + y + '/hasil: ' + s);
            return s;
        }
        normalizeDeg(deg) {
            // console.log('normalize anggle, input: ' + deg);
            while (deg >= 360) {
                deg -= 360;
            }
            while (deg <= -360) {
                deg += 360;
            }
            if (deg < 0)
                deg = 360 + deg;
            // console.log('normalize anggle, output: ' + deg);
            return deg;
        }
        degMaxDist(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            let deg = this.degMinDist(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
            // if (angleT > angleS) {
            // 	if (angleT - angleS > 180) {
            // 		return angleT - angleS;
            // 	}
            // 	else {
            // 		return -(angleS + 360 - angleT);
            // 	}
            // }
            // else {
            // 	if (angleS - angleT > 180) {
            // 		return angleT - angleS;
            // 	}
            // 	else {
            // 		return 360 + angleT - angleS;
            // 	}
            // }
        }
        degMinDist(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            if (angleT >= angleS) {
                if (angleT - angleS > 180) {
                    return -(angleS + 360 - angleT);
                }
                else {
                    return angleT - angleS;
                }
            }
            else {
                if (angleS - angleT >= 180) {
                    return 360 + angleT - angleS;
                }
                else {
                    return angleT - angleS;
                }
            }
        }
        //TODO: dihapus
        // vectorTo(x: number, y: number, xt: number, yt: number): IV2D {
        // 	let pjx: number = xt - x;
        // 	let pjy: number = yt - y;
        // 	this._lastX = pjx;
        // 	this._lastY = pjy;
        // 	return {
        // 		x: pjx,
        // 		y: pjy
        // 	}
        // }
        //TODO: disederhanakan
        // moveTo(x: number, y: number, xt: number, yt: number, clamp: number): void {
        // 	let pjx: number = xt - x;
        // 	let pjy: number = yt - y;
        // 	let pj: number = this.dist(x, y, xt, yt);
        // 	let perb: number = Math.abs(clamp) / pj;
        // 	this._lastX = x + perb * pjx;
        // 	this._lastY = y + perb * pjy;
        // }
        //TODO: disederhanakan
        // moveFrom(x: number = 0, y: number = 0, xt: number = 0, yt: number = 0, v: number = 0): IV2D {
        // 	let pjx: number = xt - x;
        // 	let pjy: number = yt - y;
        // 	let pj: number = this.dist(x, y, xt, yt);
        // 	let perb: number = Math.abs(v) / pj;
        // 	this._lastX = perb * -pjx;
        // 	this._lastY = perb * -pjy;
        // 	return {
        // 		x: this._lastX,
        // 		y: this._lastY
        // 	}
        // }
        //TODO: disederhankan, dimulai dari 0
        dist(x, y, xt, yt) {
            let pjx = xt - x;
            let pjy = yt - y;
            return Math.sqrt(pjx * pjx + pjy * pjy);
        }
        rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            // console.group('transform roteate rel:');
            // console.log('xr ' + xr + '/yr ' + yr);
            // console.log('deg ' + deg);
            deg *= ha.trans.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            // console.log('x1 ' + Math.round(x1) + '/y1 ' + Math.round(y1));
            this._lastX = x1 + xt;
            this._lastY = y1 + yt;
            // console.log('last ' + Math.round(this._lastX) + '/' + Math.round(this._lastY));
            // console.groupEnd();
        }
    }
    ha.trans = new Transform();
})(ha || (ha = {}));

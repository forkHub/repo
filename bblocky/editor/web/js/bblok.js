///<reference path="./Route.ts"/>
const LoadSound = ha.be.Sound.Load;
const PlaySound = ha.be.Sound.Play;
const SoundEnded = ha.be.Sound.SoundEnded;
const SoundLoaded = ha.be.Sound.SoundLoaded;
///<reference path="./Route.ts"/>
const Cls = ha.be.Be.Bersih;
const Graphics = ha.be.Be.Grafis;
const Color = ha.be.Be.Warna;
const Stroke = ha.be.Be.StrokeColor;
// /**
//  * Mengembalikan warna merah dari perintah AmbilPixel terakhir
//  * @returns (number) warna merah
//  */
// };
const Red = ha.be.Be.Merah;
const Green = ha.be.Be.Hijau;
const Blue = ha.be.Be.Biru;
const Alpha = ha.be.Be.Transparan;
const GetPixel = ha.be.Img.AmbilPiksel;
const SetPixel = ha.be.Img.SetPiksel;
// const Kontek = ha.be.Be.Kontek;
// const Kanvas = ha.be.Be.Kanvas;
const Line = ha.be.Be.Garis;
const Rect = ha.be.Be.Kotak;
const Oval = ha.be.Be.Oval;
//TODO: bezier, bezier 3, dll
const CreateDict = ha.be.Dict.Create;
const DictGetValue = ha.be.Dict.GetValue;
const DictAddAttr = ha.be.Dict.AddAttr;
const DictGetKeyList = ha.be.Dict.GetKeyList;
const DictGetValueList = ha.be.Dict.GetValueList;
///<reference path="./Route.ts"/>
const InputHit = ha.be.Input.InputHit;
const InputX = ha.be.Input.InputX;
const InputY = ha.be.Input.InputY;
const InputIsDown = ha.be.Input.Pencet;
// //extended
const FlushInput = ha.be.Input.FlushInput;
const InputDragX = ha.be.Input.GeserX;
const InputDragY = ha.be.Input.GeserY;
const InputIsDragged = ha.be.Input.Geser;
const InputType = ha.be.Input.InputType;
const InputTapCount = ha.be.Input.JmlTap;
const InputDragStartCount = ha.be.Input.JmlDragMulai;
const InputDragEndCount = ha.be.Input.JmlDragSelesai;
const InputDragStartX = ha.be.Input.InputXAwal;
const InputDragStartY = ha.be.Input.InputYAwal;
//TODO: input id
// // const FlushKeys = () => {
// // 	// ha.be.input.flushByInput(ha.be.input.keybGlobal);
// // 	ha.be.input.flushByType('keyb');
// // }
// // const GetKey = (): string => {
// // 	return ha.be.input.keybGlobal.key;
// // }
// // const KeybDiPencet = (key: string = ''): boolean => {
// // 	if ("" == key) {
// // 		return ha.be.input.keybGlobal.isDown;
// // 	}
// // 	else {
// // 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// // 		if (input) {
// // 			return input.isDown;
// // 		}
// // 		return false;
// // 	}
// // }
// // const KeybHit = (key: string = ''): number => {
// // 	if ("" == key) {
// // 		let n: number = ha.be.input.keybGlobal.hit;
// // 		ha.be.input.keybGlobal.hit = 0;
// // 		return (n);
// // 	}
// // 	else {
// // 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// // 		let n: number = 0;
// // 		if (input) {
// // 			n = input.hit;
// // 			input.hit = 0;
// // 		}
// // 		return n;
// // 	}
// // }
// const Sudut = ha.be.Mat.Sudut;
const DistMin = ha.be.Transform.degDistMin;
///<reference path="./Route.ts"/>
const LoadImage = ha.be.Spr.Muat; //
const MuatAsync = ha.be.Spr.MuatAsync;
const LoadAnimImage = ha.be.Spr.MuatAnimasi;
const ResizeImage = ha.be.Spr.Ukuran;
const DrawImage = ha.be.Spr.Gambar;
const DrawImageXY = ha.be.Spr.GambarXY;
const Handle = ha.be.Spr.Handle;
const Rotation = ha.be.Spr.Rotasi;
const Collide = ha.be.Spr.Tabrakan;
const CollideXY = ha.be.Spr.TabrakanXY;
const SpriteKontek = ha.be.Spr.kontek;
const Width = ha.be.Spr.Panjang;
const Height = ha.be.Spr.Lebar;
const Tile = ha.be.Spr.Ubin;
//next:
const ImageLoaded = ha.be.Spr.Dimuat;
const AllImageLoaded = ha.be.Spr.StatusMuat;
const PositionImageXY = ha.be.Spr.Posisi;
const PositionImagePolar = ha.be.Spr.posisiPolar;
const DrawAllImage = ha.be.Spr.GambarSemua;
const ImageXPosition = ha.be.Spr.PosisiX;
const ImageYPosition = ha.be.Spr.PosisiY;
const ImageAlpha = ha.be.Spr.Alpha;
const ImageIsDragged = ha.be.Spr.StatusDrag;
const CopyImage = ha.be.Spr.Copy;
const ImageBound = ha.be.Spr.Bound;
///<reference path="./Route.ts"/>
// Shortcut buat perintah-perintah font
const FontName = ha.be.Teks.Font;
const FontSize = ha.be.Teks.FontSize;
const Print = ha.be.Teks.Tulis;
const Align = ha.be.Teks.Rata;

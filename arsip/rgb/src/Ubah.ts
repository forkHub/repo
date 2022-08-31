window.onload = () => {
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    let img: HTMLImageElement = document.getElementById('gbr') as HTMLImageElement;

    canvas.style.width = img.naturalWidth + 'px';
    canvas.style.height = img.naturalHeight + 'px';
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    document.body.appendChild(canvas);
    ctx.drawImage(img, 0, 0);

    ubahWarnaGambar(canvas, [0, 85, 170, 255]);
}

function ubahWarnaKomponen(warna: number, level: number[], atas: boolean): number {
    for (let i: number = level.length - 2; i >= 0; i--) {
        if (warna > level[i]) {
            if (atas) {
                return level[i + 1];
            }
            else {
                return level[i];
            }
        }
        else if (warna == level[i]) {
            return warna;
        }
    }

    throw Error('warna tidak ada dalam level');
}

function checkBulatAtas(x: number, y: number): boolean {
    let modx: number = x % 2;
    let mody: number = y % 2;

    return modx == mody;
}

function ubahWarnaGambar(canvas: HTMLCanvasElement, level: number[]): void {
    let ctx: CanvasRenderingContext2D;
    let data: ImageData;

    ctx = canvas.getContext('2d');

    for (let i: number = 0; i < canvas.width; i++) {
        for (let j: number = 0; j < canvas.height; j++) {
            data = ctx.getImageData(i, j, 1, 1);

            // console.log('x ' + i + '/y ' + j + "/bulat " + checkBulatAtas(i, j));

            data.data[0] = ubahWarnaKomponen(data.data[0], level, checkBulatAtas(i, j));
            data.data[1] = ubahWarnaKomponen(data.data[1], level, checkBulatAtas(i, j));
            data.data[2] = ubahWarnaKomponen(data.data[2], level, checkBulatAtas(i, j));

            ctx.putImageData(data, i, j);
        }
    }
}
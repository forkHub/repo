class Gbr64 {
    canvas1: HTMLCanvasElement;
    canvas2: HTMLCanvasElement;
    ctx2: CanvasRenderingContext2D;

    init(): void {
        this.canvas1 = document.createElement('canvas');
        this.canvas2 = document.createElement('canvas');
        let ctx1: CanvasRenderingContext2D = this.canvas1.getContext('2d');
        this.ctx2 = this.canvas2.getContext('2d');
        let img: HTMLImageElement = document.getElementById('decor') as HTMLImageElement;

        this.canvas1.style.width = img.naturalWidth + 'px';
        this.canvas1.style.height = img.naturalHeight + 'px';
        this.canvas1.width = img.naturalWidth;
        this.canvas1.height = img.naturalHeight;

        this.canvas2.style.width = '320px';
        this.canvas2.style.height = '330px';
        this.canvas2.width = 320;
        this.canvas2.height = 330;

        document.body.appendChild(this.canvas1);
        // document.body.appendChild(this.canvas2);

        ctx1.drawImage(img, 0, 0);
        this.ctx2.drawImage(img, 0, 0);
    }

    ubahWarna2(warna: number, kunci: number[], dither: boolean): number {
        if (warna > kunci[2]) {
            if (dither) {
                return kunci[3]
            }
            else {
                return kunci[2];
            }
        }
        else if (warna > kunci[1]) {
            if (dither) {
                return kunci[2]
            }
            else {
                return kunci[1];
            }
        }
        else {
            if (dither) {
                return kunci[1]
            }
            else {
                return kunci[0];
            }
        }
    }

    dither(x: number, y: number): boolean {
        let hasil: boolean = false;

        if (x % 2 == 0) {
            if (y % 2 == 0) {
                hasil = true;
                // return true;
            }
        }
        else if (x % 2 != 0) {
            if (y % 2 != 0) {
                hasil = true;
                // return true;
            }
        }

        // console.log('dither x: ' + x + '/y: ' + y + '/dither: ' + hasil);

        // hasil = true;
        return hasil;
        // return false;
    }

    ubahImage(canvas: HTMLCanvasElement): void {
        let ctx: CanvasRenderingContext2D;
        let data: ImageData;
        let base64: string = '';
        let warna: number[] = [0, 85, 170, 255];

        ctx = canvas.getContext('2d');

        for (let i: number = 0; i < canvas.width; i++) {
            for (let j: number = 0; j < canvas.height; j++) {
                data = ctx.getImageData(i, j, 1, 1);

                data.data[0] = this.ubahWarna2(data.data[0], warna, this.dither(i, j));
                data.data[1] = this.ubahWarna2(data.data[1], warna, this.dither(i, j));
                data.data[2] = this.ubahWarna2(data.data[2], warna, this.dither(i, j));

                ctx.putImageData(data, i, j);
            }
        }

        console.log('base64');
        console.log(base64);
    }
}

window.onload = () => {
    let gbr64: Gbr64 = new Gbr64();
    gbr64.init();
    gbr64.ubahImage(gbr64.canvas1);
}
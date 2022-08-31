"use strict";
class Rgb {
    // private ctr: number = 0;
    //                          1
    b64Char = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;
    _schema;
    init() {
        this._schema = this.buatScheme();
        console.log(this._schema);
    }
    getChar(r) {
        // let hasil: string = '';
        if (r.r > 0)
            r.r--;
        if (r.g > 0)
            r.g--;
        if (r.b > 0)
            r.b--;
        for (let i = 0; i < this._schema.length; i++) {
            if (this.sama(r, this._schema[i])) {
                return this.b64Char.charAt(i);
            }
        }
        console.log(r);
        throw Error('');
    }
    max(r) {
        let hasil;
        hasil = r.r;
        hasil = Math.max(hasil, r.g);
        hasil = Math.max(hasil, r.b);
        return hasil;
    }
    sama(r1, r2) {
        if (r1.r != r2.r)
            return false;
        if (r1.g != r2.g)
            return false;
        if (r1.b != r2.b)
            return false;
        // console.log("sama");
        // console.log(r1);
        // console.log(r2);
        return true;
    }
    tambah(r1, r2) {
        let hasil;
        // console.log('tambah');
        // console.log(r1);
        // console.log(r2);
        hasil = {
            r: r1.r + r2.r,
            g: r1.g + r2.g,
            b: r1.b + r2.b
        };
        let m = this.max(hasil);
        let scale;
        if (m <= 256) {
            scale = 1;
        }
        else if (m <= 512) {
            scale = .5;
        }
        else {
            throw Error('');
        }
        hasil.r *= scale;
        hasil.g *= scale;
        hasil.b *= scale;
        hasil.r = Math.floor(hasil.r);
        hasil.g = Math.floor(hasil.g);
        hasil.b = Math.floor(hasil.b);
        return hasil;
    }
    tambahAr2(sumber) {
        let hasil = [];
        hasil.push(this.tambah(sumber[0], sumber[1]));
        hasil.push(this.tambah(sumber[1], sumber[2]));
        hasil.push(this.tambah(sumber[0], sumber[2]));
        return hasil;
    }
    tambahAr(sumber) {
        let hasil = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let r1 = sumber[i];
                let r2 = sumber[j];
                if (!this.sama(r1, r2)) {
                    let r3 = this.tambah(r1, r2);
                    hasil.push(r3);
                }
            }
        }
        return hasil;
    }
    render(r, canvas) {
        let ctx = canvas.getContext('2d');
        let ctr = -1;
        let x = 0;
        let y = 0;
        let n = 10;
        r.forEach((i) => {
            ctr++;
            x = ctr % n;
            y = Math.floor(ctr / n);
            x *= 32;
            y *= 32;
            // console.log(x + '/' + y);
            ctx.fillStyle = `rgb(${i.r},${i.g},${i.b})`;
            ctx.fillRect(x, y, 32, 32);
        });
    }
    urut(r) {
        for (let i = 0; i < r.length; i++) {
            for (let j = i + 1; j < r.length; j++) {
                let r1 = r[i];
                let r2 = r[j];
                if (r1.data < r2.data) {
                    let r3 = r1;
                    r[i] = r2;
                    r[j] = r3;
                }
            }
        }
    }
    light(r) {
        r.data = r.r + r.g + r.b;
    }
    ubahWarna2(warna, kunci, dither) {
        if (warna > kunci[2]) {
            if (dither) {
                return kunci[3];
            }
            else {
                return kunci[2];
            }
        }
        else if (warna > kunci[1]) {
            if (dither) {
                return kunci[2];
            }
            else {
                return kunci[1];
            }
        }
        else {
            if (dither) {
                return kunci[1];
            }
            else {
                return kunci[0];
            }
        }
    }
    checkDither(x, y) {
        let hasil = false;
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
        return hasil;
        // return false;
    }
    ubahImage(canvas, dither = true) {
        let ctx;
        let data;
        let base64 = '';
        let warna = [0, 85, 170, 255];
        // this.ctr = 0;
        dither;
        ctx = canvas.getContext('2d');
        for (let i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                data = ctx.getImageData(i, j, 1, 1);
                let rgb = {
                    r: data.data[0],
                    g: data.data[1],
                    b: data.data[2]
                };
                rgb.r = this.ubahWarna2(rgb.r, warna, this.checkDither(i, j));
                rgb.g = this.ubahWarna2(rgb.g, warna, this.checkDither(i, j));
                rgb.b = this.ubahWarna2(rgb.b, warna, this.checkDither(i, j));
                // let rgb2: Irgb = this.ubahWarna(rgb, dither);
                data.data[0] = rgb.r;
                data.data[1] = rgb.g;
                data.data[2] = rgb.b;
                ctx.putImageData(data, i, j);
                // base64 += this.getChar(rgb2);
            }
        }
        console.log('base64');
        console.log(base64);
    }
    ubahWarna(r, dither) {
        let hasil;
        // this.ctr++;
        hasil = {
            r: this.gridRgb(r.r, dither),
            b: this.gridRgb(r.b, dither),
            g: this.gridRgb(r.g, dither)
        };
        return hasil;
    }
    gridRgb(rgb, dither) {
        let grid = 0;
        let sisa = 0;
        let c = 84;
        dither;
        // this.ctr++;
        grid = Math.floor(rgb / c);
        sisa = rgb % c;
        grid *= c;
        // grid += 64;
        if (sisa == 0) {
            //kosong
        }
        else {
            if (sisa > (c / 2)) {
                grid += c;
            }
            else {
                //kosong
            }
        }
        return grid;
    }
    buatScheme() {
        let warna = [0, 83, 167, 251];
        let hasil = [];
        for (let r = 0; r < warna.length; r++) {
            for (let g = 0; g < warna.length; g++) {
                for (let b = 0; b < warna.length; b++) {
                    let rgb = {
                        r: warna[r],
                        g: warna[g],
                        b: warna[b]
                    };
                    hasil.push(rgb);
                }
            }
        }
        return hasil;
    }
}
let rgb = new Rgb();

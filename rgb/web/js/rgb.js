var rgb;
(function (rgb_1) {
    function tambah(rgb1, rgb2) {
        return {
            r: Math.floor((rgb1.r + rgb2.r)),
            b: Math.floor((rgb1.b + rgb2.b)),
            g: Math.floor((rgb1.g + rgb2.g))
        };
    }
    rgb_1.tambah = tambah;
    function buat(r, g, b) {
        return {
            r: r,
            g: g,
            b: b
        };
    }
    rgb_1.buat = buat;
    function buatWarna(rgb1, rgb2, rgb3) {
        let hasil = [];
        hasil.push(normal(tambah(rgb1, rgb2)));
        hasil.push(normal(tambah(rgb2, rgb3)));
        hasil.push(normal(tambah(rgb1, rgb3)));
        return hasil;
    }
    rgb_1.buatWarna = buatWarna;
    function terbesar(rgb) {
        let hasil = rgb.r;
        if (rgb.b > hasil) {
            hasil = rgb.b;
        }
        if (rgb.g > hasil) {
            hasil = rgb.g;
        }
        return hasil;
    }
    function normal(rgb) {
        let hasil;
        let mak;
        mak = terbesar(rgb);
        hasil = {
            r: Math.floor((rgb.r / mak) * 255),
            b: Math.floor((rgb.b / mak) * 255),
            g: Math.floor((rgb.g / mak) * 255)
        };
        return hasil;
    }
    rgb_1.normal = normal;
})(rgb || (rgb = {}));

let warna = [];
warna = [rgb.buat(255, 0, 0), rgb.buat(0, 255, 0), rgb.buat(0, 0, 255)];
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
warna = rgb.buatWarna(warna[0], warna[1], warna[2]);
document.body.appendChild(buatKotak(warna));
function buatKotak(warna) {
    let hasil;
    hasil = document.createElement('div');
    hasil.classList.add('disp-flex');
    hasil.style.height = '32px';
    hasil.appendChild(buatKotak2(rgb.normal(warna[0])));
    hasil.appendChild(buatKotak2(rgb.normal(warna[1])));
    hasil.appendChild(buatKotak2(rgb.normal(warna[2])));
    function buatKotak2(rgb) {
        let hasil;
        hasil = document.createElement('div');
        hasil.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        hasil.classList.add('flex-grow-1');
        return hasil;
    }
    return hasil;
}

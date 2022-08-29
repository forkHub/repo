"use strict";
let n = 176;
function toBin(n) {
    let hasil;
    hasil = n.toString(2);
    hasil = "00000000" + hasil;
    hasil = hasil.slice(hasil.length - 8);
    return hasil;
}
console.log(toBin(n));
console.log(toBin(n & 63));
console.log(toBin(n & 192));
console.log(toBin((n & 192) >> 6));

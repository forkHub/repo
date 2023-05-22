"use strict";
let str = '';
for (let i = 0; i < 255; i++) {
    if (i >= 32) {
        str += String.fromCharCode(i);
    }
}
console.log(str);
console.log('▒');
console.log(String.fromCharCode(178));

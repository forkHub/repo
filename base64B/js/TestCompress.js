"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const B64B_js_1 = require("./B64B.js");
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(Math.floor(Math.random() * 255)));
// test(randomString(0));
// test(randomString(1));
// test(randomString(2));
// test('');
randomString(0);
test('11111111111');
function test(str) {
    console.log('test:');
    let encode = B64B_js_1.b64b.encode(str);
    let compress = B64B_js_1.b64b.compress(encode);
    let decomp = B64B_js_1.b64b.decompress(compress);
    let decode = B64B_js_1.b64b.decode(decomp);
    // console.log('');
    // console.log('encode  : ' + encode + '|');
    // console.log('compress: ' + compress + '|');
    // console.log('decomp  : ' + decomp + '|');
    console.log(str == decode);
    console.log('encode       : ' + ((encode.length / str.length)));
    console.log('compress enc : ' + Math.floor((compress.length / encode.length) * 100));
    console.log('compress str : ' + Math.floor((compress.length / str.length) * 100));
    // console.log('');
}
function randomString(l) {
    let str = '';
    for (let i = l; i >= 0; i--) {
        str += String.fromCharCode(Math.floor(Math.random() * 255));
    }
    return str;
}

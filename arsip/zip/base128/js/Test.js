"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const B642_js_1 = require("./B642.js");
test('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/');
test("!@#$%^&*()_+");
test("??><,.");
let str = '';
for (let i = 0; i < 255; i++) {
    str += String.fromCharCode(i);
}
test(str);
for (let i = 255; i >= 0; i--) {
    str += String.fromCharCode(i);
}
test(str);
//random
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(Math.floor(Math.random() * 255)));
test(randomString(0));
test(randomString(1));
test(randomString(2));
test('');
function randomString(l) {
    let str = '';
    for (let i = l; i >= 0; i--) {
        str += String.fromCharCode(Math.floor(Math.random() * 255));
    }
    return str;
}
function test(strTest) {
    let hasil = B642_js_1.b64a.encode(strTest);
    hasil;
    // console.log('hasil: ' + hasil);
    // let awal: string = b64a.decode(hasil);
    // console.log('test str: ' + strTest);
    // console.log('awal str: ' + awal);
    // console.log('test bool: ' + (strTest == awal));
}

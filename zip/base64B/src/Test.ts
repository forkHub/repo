import { b64b } from "./B64B.js";

test('0123456789');
test('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/');
test("!@#$%^&*()_+");
test("??><,.");
test("999999999//////////");

// let str: string = '';
// for (let i: number = 0; i < 255; i++) {
//     str += String.fromCharCode(i);
// }
// test(str);

// for (let i: number = 255; i >= 0; i--) {
//     str += String.fromCharCode(i);
// }
// test(str);

//random
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

// function randomString(l: number): string {
//     let str: string = '';
//     for (let i: number = l; i >= 0; i--) {
//         str += String.fromCharCode(Math.floor(Math.random() * 255));
//     }

//     return str;
// }

function test(strTest: string): void {
    let hasil: string = b64b.encode(strTest);

    console.log('hasil: ' + hasil);
    // let awal: string = b64a.decode(hasil);

    // console.log('test str: ' + strTest);
    // console.log('awal str: ' + awal);

    // console.log('test bool: ' + (strTest == awal));
}
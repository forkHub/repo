import { b64a } from "./B642.js";

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

function test(str: string) {
    console.log('test:');

    let encode: string = b64a.encode(str);
    let compress: string = b64a.compress(encode);
    let decomp: string = b64a.decompress(compress);
    let decode: string = b64a.decode(decomp);

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

function randomString(l: number): string {
    let str: string = '';
    for (let i: number = l; i >= 0; i--) {
        str += String.fromCharCode(Math.floor(Math.random() * 255));
    }

    return str;
}

"use strict";
function testTambah(i, j) {
    let h = (i + j) + '';
    let hs = ha.cacah.tambah(i + '', j + '');
    if (h != hs) {
        throw Error('test tambah error, h: ' + h + '/hs' + hs);
    }
}
function testKurangi(i, j) {
    let hn;
    let hs;
    hs = ha.cacah.kurangi(i + '', j + '');
    if (i > j) {
        hn = (i - j) + '';
        if (hn != hs)
            throw Error('kurang  i ' + i + '/j ' + j);
    }
    else if (i <= j)
        hn = 0 + '';
    {
        if (hn != hs)
            throw Error('kurang i ' + i + '/j ' + j + '/hn ' + hn + '/hs' + hs);
    }
}
function testKurangDari(i, j) {
    let h = (i < j);
    let hs = ha.cacah.kurangDari(i + '', j + '');
    if (h != hs) {
        throw Error('kurang dari error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }
}
function testKurangDariSama(i, j) {
    let h = (i <= j);
    let hs = ha.cacah.kurangDariSamaDengan(i + '', j + '');
    if (h != hs) {
        throw Error('kurang dari sama error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }
}
function testlebihDariSama(i, j) {
    let h = (i >= j);
    let hs = ha.cacah.lebihDariSamaDengan(i + '', j + '');
    if (h != hs) {
        throw Error('lebih dari sama error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }
}
async function testKali(i, j) {
    let hn = (i * j);
    let hs = parseInt(await ha.cacah.kali(i + '', j + ''));
    if (hn != hs) {
        console.log("test kali error, /i ", i, "/j ", j, "/hn ", hn, "/hs ", hs);
        throw Error('test kali error');
    }
}
async function testBagi(i, j) {
    let hs = await ha.cacah.bagi(i + '', j + '');
    // console.log('test bagi i ' + i + '/j ' + j);
    if (j == 0) {
        if (hs != "0")
            throw Error("");
        return;
    }
    if (i < j) {
        if (ha.cacah.sisa() != (i + '')) {
            console.log('sisa bagi error sisa: ' + ha.cacah.sisa() + "/i " + i + "/j " + j);
            throw Error("");
        }
        if (hs != "0") {
            console.log("hasil bagi error, hasil " + hs + "/i " + i + "/j " + j);
            throw Error("");
        }
    }
    else if (i > j) {
        let hn = '';
        if (j != 0) {
            hn = Math.floor(i / j) + '';
        }
        else {
            hn = '0';
        }
        if (hs != hn) {
            console.log("hasil bagi tidak sama, hn " + hn + "/hs " + hs + "/i " + i + "/j " + j);
            throw Error("");
        }
    }
    else {
        if (hs != "1") {
            console.log("hasil bagi != 1");
            console.log("hasil bagi error, i " + i + "/j " + j);
            throw Error("");
        }
    }
}
function testSepuluh(n) {
    let sep = ha.cacah.sepuluh(n + '0');
    if (sep != (n + '')) {
        console.log('n: ' + n);
        console.log('hasil: ' + sep);
        throw Error('');
    }
}
async function testHabisDibagi(n, n2, awal = 0) {
    if (!ha.cacah.habisDibagi(n + '', n2 + '', awal + '')) {
        console.log("angka " + n);
        console.log("pembagi " + n2);
        console.log("awal " + awal);
        throw Error('');
    }
}
let h = ha.cacah.bagi('20', '2');
if (!h) {
    throw new Error('');
}
function testSepuluhSet() {
    console.group('test sepuluh set');
    console.log(ha.cacah.sepuluhSet('10'));
    console.log(ha.cacah.sepuluhSet('12'));
    console.log(ha.cacah.sepuluhSet('32'));
    console.log(ha.cacah.sepuluhSet('2'));
    console.groupEnd();
}
async function testKali2(a, b) {
    let hs = (await ha.cacah.kali(a + '', b + ''));
    let h = parseInt(hs) == (a * b);
    if (!h) {
        console.log('test kali 2');
        console.log(a);
        console.log(b);
        console.log(hs);
        console.log(a * b);
        throw Error();
    }
}
async function test() {
    testSepuluhSet();
    for (let i = 0; i < 200; i++) {
        testSepuluh(i);
        await testHabisDibagi(i * Math.floor(Math.random() * 100), i);
        await testHabisDibagi(i * Math.floor(Math.random() * 100), i, i);
        for (let j = 0; j < 200; j++) {
            await testKali2(i, j);
            testTambah(i, j);
            testKurangDari(i, j);
            testKurangi(i, j);
            await testKali(i, j);
            await testBagi(i, j);
            testKurangDariSama(i, j);
            testlebihDariSama(i, j);
        }
    }
}
test().catch((e) => {
    console.log(e);
});

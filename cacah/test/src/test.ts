
async function testTambah(i: number, j: number) {
    let h = (i + j) + '';
    let hs = ha.cacah.tambah(i + '', j + '');

    if (h != hs) {
        throw Error('test tambah error, h: ' + h + '/hs' + hs);
    }
}

async function testKurangi(i: number, j: number) {
    let hn;
    let hs;

    hs = ha.cacah.kurangi(i + '', j + '');

    if (i > j) {
        hn = (i - j) + '';
        if (hn != hs) throw Error('kurang  i ' + i + '/j ' + j);
    }
    else if (i <= j)
        hn = 0 + ''; {
        if (hn != hs) throw Error('kurang i ' + i + '/j ' + j + '/hn ' + hn + '/hs' + hs);
    }
}

async function testKurangDari(i: number, j: number) {
    let h = (i < j);
    let hs: boolean = ha.cacah.kurangDari(i + '', j + '');

    if (h != hs) {
        throw Error('kurang dari error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }

}

async function testKurangDariSama(i: number, j: number) {
    let h = (i <= j);
    let hs: boolean = ha.cacah.kurangDariSamaDengan(i + '', j + '');

    if (h != hs) {
        throw Error('kurang dari sama error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }
}

async function testlebihDariSama(i: number, j: number) {
    let h = (i >= j);
    let hs: boolean = ha.cacah.lebihDariSamaDengan(i + '', j + '');

    if (h != hs) {
        throw Error('lebih dari sama error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }
}

async function testKali(i: number, j: number) {
    let hn = (i * j);
    let hs = parseInt(ha.cacah.kali(i + '', j + ''));

    if (hn != hs) {
        console.log("test kali error, /i ", i, "/j ", j, "/hn ", hn, "/hs ", hs);
        throw Error('test kali error');
    }
}

async function testBagi(i: number, j: number) {
    if (j == 0) return;

    let hs: string = ha.cacah.bagi(i + '', j + '');

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

        hn = Math.floor(i / j) + '';
        let sisa = i % j;

        if (hs != hn) {
            console.log("hasil bagi tidak sama, hn " + hn + "/hs " + hs + "/i " + i + "/j " + j);
            throw Error("");
        }

        if (sisa + '' != ha.cacah.sisa()) {
            console.log("i " + i + "/j " + j);
            console.log("sisa tidak sama, sisa n " + sisa + "/sisa s " + ha.cacah.sisa());
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

async function testHabisDibagi(n: number, n2: number) {
    if (n2 == 0) return;

    if (false == ha.cacah.habisDibagi(n + '', n2 + '')) {
        console.log("angka " + n);
        console.log("pembagi " + n2);
        throw Error('');
    }
}

async function kali(a: number, b: number) {
    let hs: string = (ha.cacah.kali(a + '', b + ''));
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

async function testPangkat(n: number, b: number) {
    let n2 = Math.pow(n, b) + '';
    let hs = ha.cacah.pangkat(n + '', b + '');

    if (hs != n2) {
        console.log("n " + n + '/b ' + b + '/n2 ' + n2 + '/hs ' + hs);
        throw Error();
    }
}

async function test() {

    //benchmark pangkat
    let timer = Date.now();
    console.log('test pangkat');
    console.log(ha.cacah.pangkat('879652756465456', '150'));
    console.log(Date.now() - timer);

    //test pangkat
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            await testPangkat(i, j);
        }
    }

    for (let i = 0; i < 20; i++) {
        // testSepuluh(i);
        await testHabisDibagi(i * Math.floor(Math.random() * 100), i);
        await testHabisDibagi(i * Math.floor(Math.random() * 100), i);
        for (let j = 0; j < 20; j++) {
            await kali(i, j);
            await testTambah(i, j);
            await testKurangDari(i, j);
            await testKurangi(i, j);
            await testKali(i, j);
            await testBagi(i, j);
            await testKurangDariSama(i, j);
            await testlebihDariSama(i, j);
        }
    }
}

test().catch((e) => {
    console.log(e);
})

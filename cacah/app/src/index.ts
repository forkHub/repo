
function testTambah(i: number, j: number) {
    let h = (i + j) + '';
    let hs = ha.cacah.tambah(i + '', j + '');

    if (h != hs) {
        throw Error('test tambah error, h: ' + h + '/hs' + hs);
    }
}

function testKurang(i: number, j: number) {
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

function testKurangDari(i: number, j: number) {
    let h = (i < j);
    let hs = ha.cacah.kurangDari(i + '', j + '');

    if (h != hs) {
        throw Error('kurang dari error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }

}

function testKurangDariSama(i: number, j: number) {
    let h = (i <= j);
    let hs = ha.cacah.kurangDariSamaDengan(i + '', j + '');

    if (h != hs) {
        throw Error('kurang dari sama error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }
}

function testlebihDariSama(i: number, j: number) {
    let h = (i >= j);
    let hs = ha.cacah.lebihDariSamaDengan(i + '', j + '');

    if (h != hs) {
        throw Error('lebih dari sama error /i ' + i + '/j ' + j + '/h ' + h + '/hs ' + hs);
    }
}

async function testKali(i: number, j: number) {
    let hn = (i * j) + '';
    let hs = await ha.cacah.kali(i + '', j + '');

    // console.log('test kali i ' + i + '/j ' + j);

    if (hn != hs) {
        console.log("test kali error, i ", i, "j ", j, "hn ", hn, "hs ", hs);
        throw Error('test kali error');
    }
}

async function testBagi(i: number, j: number) {
    let hs = await ha.cacah.bagi(i + '', j + '');

    // console.log('test bagi i ' + i + '/j ' + j);

    if (j == 0) {
        if (hs != "0") throw Error("");
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

let h = ha.cacah.bagi('20', '2');
if (!h) {
    throw new Error('');
}

async function test() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            testTambah(i, j);
            testKurangDari(i, j);
            testKurang(i, j);
            await testKali(i, j);
            await testBagi(i, j);
            testKurangDariSama(i, j);
            testlebihDariSama(i, j);
        }
    }
}

test().catch((e) => {
    console.log(e);
})



function assert(n: any, n2: any) {
    try {
        if (n !== n2) throw Error(n + '/' + n2);
        console.log('ok', n);
    }
    catch (e) {
        console.warn(e);
    }

}

async function test() {
    // assert(await ha.cacah.kurang('3', '4'), '996');
    console.log(await ha.cacah.bagi('10', '2'));
}
test();

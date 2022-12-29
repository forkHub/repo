///<reference path='PathFinder.ts'/>
let peta = [];
function mulai() {
    let res = [];
    initPeta();
    res = pfCariJalan(2, 2, 7, 2);
    console.log(res);
    res = pfCariJalan(0, 0, 7, 0);
    console.log(res);
    res = pfCariJalan(0, 0, 17, 17);
    console.log(res);
    res = pfCariJalan(2, 2, 5, 2);
    console.log(res);
}
function initPeta() {
    pfDataPeta = [
        "XXXXXXXXXX",
        "X        X",
        "X    X   X",
        "X    X   X",
        "X    X   X",
        "X        X",
        "XXXXXXXXXX",
    ];
    console.log('init peta');
}
mulai();

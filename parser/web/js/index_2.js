function pushCadangan(kata) {
    kata.forEach((item) => {
        parser.kataCadangan.push(item);
    });
}
async function load() {
    return await ha.comp.Util.Ajax2('get', './data/test.js', '');
}
let debugStatus;
function debugOn() {
    debugStatus = true;
}
function debugOff() {
    debugStatus = false;
}
function debugLog(msg, status = false) {
    if (debugStatus || status) {
        console.log(msg);
    }
}
function debugGroupCollapsed(msg, status = false) {
    if (debugStatus || status) {
        console.groupCollapsed(msg);
    }
}
function debugGroup(msg, status = false) {
    if (debugStatus || status) {
        console.group(msg);
    }
}
function debugGroupEnd(status = false) {
    if (debugStatus || status) {
        console.groupEnd();
    }
}
function renderToken(token) {
    let hasil = '';
    token.forEach((item) => {
        hasil += item.nama;
        hasil += ' ';
    });
    return hasil;
}
function pushRumus(rumusAr) {
    rumusAr.forEach((item) => {
        grammarAr.push(item);
    });
}

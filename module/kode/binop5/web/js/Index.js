"use strict";
function init() {
    data.load();
    data.buatHalaman();
    data.halModul.attach(document.body);
    data.variableAr.forEach((item) => {
        if (item.indukId == 0) {
            data.halModul.renderVar(item);
        }
    });
    data.modulAr.forEach((item) => {
        data.halModul.renderModul(item);
    });
    data.dekFungsiAr.forEach((item) => {
        data.halModul.renderDekFungsi(item);
    });
}
function test() {
    data.load();
    arg.formArg.attach(document.body);
}
window.onload = () => {
    init();
};

function renderModul(data, cont) {
    let item = document.createElement('modul-item');
    item.setAttribute('nama', data.nama);
    cont.appendChild(item);
    data.subModul.forEach((anak) => {
        renderModul(anak, item.querySelector('div.anak-cont'));
    });
    //render variable
    data.variabel.forEach((variabel) => {
        let el = document.createElement('dek-var');
        item.querySelector('div.var-cont').appendChild(el);
        el.setAttribute('id', variabel.id + '');
    });
}
async function start() {
    await ha.comp.File.load('template/modul-item.html');
    await ha.comp.File.load('template/dek-var.html');
    renderModul(data, document.body);
}
start().catch((e) => {
    console.error(e);
});

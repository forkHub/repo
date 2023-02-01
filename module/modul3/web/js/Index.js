function render(data, cont) {
    let item = document.createElement('modul-item');
    if (data.tipe == 'modul') {
        let modul = data;
        item.setAttribute('nama', modul.nama);
        cont.appendChild(item);
        modul.anak.forEach((anak) => {
            render(anak, item.querySelector('div.anak-cont'));
        });
    }
    else {
        //
    }
}
async function start() {
    await ha.comp.File.load('template/modul-item.html');
    render(data, document.body);
}
start().catch((e) => {
    console.error(e);
});

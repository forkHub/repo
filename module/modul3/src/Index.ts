
function render(data: IModul | IVariable, cont: HTMLElement) {
    let item: HTMLElement = document.createElement('modul-item');

    if (data.tipe == 'modul') {
        let modul: IModul = data as IModul;
        item.setAttribute('nama', modul.nama);
        cont.appendChild(item);

        modul.anak.forEach((anak: IModul | IVariable) => {
            render(anak, item.querySelector('div.anak-cont'));
        })

    }
    else {
        //
    }
}

async function start(): Promise<void> {
    await ha.comp.File.load('template/modul-item.html');
    render(data, document.body);
}

start().catch((e) => {
    console.error(e);
})


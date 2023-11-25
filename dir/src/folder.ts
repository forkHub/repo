type TEntity = {
    id: number,
    type: string,

}

interface TFolder extends TEntity {
    label: string,
    anak: number[],
    induk: number
}

var _id: number = Date.now();
export function id(): number {
    _id++;
    return _id;
}

const data: TEntity[] = [];
function buatDef(): TFolder {
    return {
        id: id(),
        type: "folder",
        label: "dir",
        anak: [],
        induk: 0
    }
}
data.push(buatDef());
data.push(buatDef());
data.push(buatDef());
data.push(buatDef());
data.push(buatDef());

window.onmessage = () => {

}

function folderEl(item: TFolder): HTMLDivElement {
    let el: HTMLDivElement = document.createElement('div');

    el.innerHTML = `
        <span>${item.label}</span>
    `;

    return el;
}

window.onload = () => {
    //load data
    const cont = document.body.querySelector('div.daftar-folder');

    //render data
    data.forEach((item) => {
        cont?.appendChild(folderEl(item as TFolder));
    })
}

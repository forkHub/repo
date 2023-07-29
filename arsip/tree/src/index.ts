export const dialog: HTMLDialogElement = document.createElement('dialog');
dialog.onclick = () => {
    (dialog as any).close();
}

export function dialogShow(pesan: string): void {
    dialog.innerText = pesan;
    (dialog as any).showModal();
}

// export const root: FolderObj = ent.folder.buatFolder('root');

var stack = 0;
export function getStack(): number {
    stack++;
    return stack;
}

export var cont: HTMLDivElement;

window.onload = () => {
    // ent.folder.tambahFolder(root, ent.folder.buatFolder(".."));
    // ent.folder.tambahFolder(root, ent.folder.buatFolder("..."));
    // ent.folder.tambahFolder(root, ent.folder.buatFolder("test1"));
    // ent.folder.tambahFolder(root, ent.folder.buatFolder("test2"));
    // ent.folder.tambahFolder(root, ent.folder.buatFolder("test3"));
    // ent.folder.data.aktif = root;

    // document.body.appendChild(dialog);
    // cont = document.body.querySelector('div');

    // project.render();
}
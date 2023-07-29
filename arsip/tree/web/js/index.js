export const dialog = document.createElement('dialog');
dialog.onclick = () => {
    dialog.close();
};
export function dialogShow(pesan) {
    dialog.innerText = pesan;
    dialog.showModal();
}
// export const root: FolderObj = ent.folder.buatFolder('root');
var stack = 0;
export function getStack() {
    stack++;
    return stack;
}
export var cont;
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
};

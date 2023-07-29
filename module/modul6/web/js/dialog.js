export const dialog = document.createElement('dialog');
dialog.onclick = () => {
    dialog.close();
};
export function dialogShow(pesan) {
    dialog.innerText = pesan;
    dialog.showModal();
}

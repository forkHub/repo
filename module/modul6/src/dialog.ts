export const dialog: HTMLDialogElement = document.createElement('dialog');
dialog.onclick = () => {
    (dialog as any).close();
}

export function dialogShow(pesan: string): void {
    dialog.innerText = pesan;
    (dialog as any).showModal();
}
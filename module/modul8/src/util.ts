/**
 * Dialog
 */
class Dialog {
    private static readonly dlg = document.querySelector('dialog') as HTMLDialogElement;

    static open(p: string) {
        this.dlg.querySelector('p').innerHTML = p;
        (this.dlg as any).showModal();
    }

    static klik() {
        (this.dlg as any).close();
    }
}

function getQuery(key: string): string {
    let hasil = '';

    let url = window.location.search;
    let keyAr: string[] = url.split('&');
    keyAr.forEach((item) => {
        let ar = item.split('=');
        if (ar[0] == key) {
            hasil = ar[1];
        }
    })


    return hasil;
}
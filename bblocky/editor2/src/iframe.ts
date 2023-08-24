
export class Iframe {
    static init() {
        let simpan = window.localStorage.getItem("blocklycode");
        let iframe = document.querySelector('iframe') as HTMLIFrameElement;
        let doc = iframe.contentWindow.document;
        doc.open();
        doc.write(simpan);
        doc.close();
    }
}
Iframe.init();


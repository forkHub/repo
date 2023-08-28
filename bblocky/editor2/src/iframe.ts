
//entry point
export class Iframe {
    static init() {
        console.log("init");
        let simpan = window.localStorage.getItem("blocklycode");
        let iframe = document.querySelector('iframe') as HTMLIFrameElement;
        let doc = iframe.contentWindow.document;
        doc.open();
        doc.write(simpan);
        simpan;
        doc.close();
    }
}
Iframe.init();


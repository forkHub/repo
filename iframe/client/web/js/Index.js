var iframe;
(function (iframe_1) {
    let template;
    let script;
    let iframe;
    let api = {};
    window.onload = () => {
        init()
            .then()
            .catch();
    };
    async function init() {
        console.log('init');
        template = await ha.comp.Util.Ajax2('get', 'template.html', '');
        script = await ha.comp.Util.Ajax2('get', 'js/Client.js', '');
        template = template.replace('<scriptx />', `<script>${script}</script>`);
        // console.log(template);
        iframe = ha.comp.Util.getEl('iframe');
        iframe.onload = () => {
            console.log('iframe onload');
            for (let i = 0; i < 3; i++) {
                console.log(iframe.contentWindow);
                console.log('retry ' + i);
                if (iframe.contentWindow.client2.setApi != null) {
                    iframe.contentWindow.client2.setApi(api);
                    console.log('set api sukses');
                    break;
                }
                else {
                    console.log('set api delay ' + i);
                    ha.comp.Util.delay(1000);
                }
            }
        };
        // iframe.contentWindow
        console.log('set iframe content');
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(template);
        iframe.contentWindow.document.close();
    }
})(iframe || (iframe = {}));

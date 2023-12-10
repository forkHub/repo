namespace ha.blockly {
    export class Export {
        static readonly data = `
            <!DOCTYPE html>
            <html>

            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,
                    target-densityDpi=device-dpi">
                <title>Blitz Blockly</title>
            </head>

            <body>
                <canvas></canvas>
                <!-- script ref  -->
                <script src="./js/be.js" defer></script>

                <!-- main  -->
                <script>
                    "use strict";
                    window.onload = () => {
                        console.log('start');
                        /** script here **/
                        let __update; // = update || Update || UPDATE as any;
                        if (typeof update === "function")
                            __update = update;
                        if (typeof Update === "function")
                            __update = Update;
                        if (typeof UPDATE === "function")
                            __update = UPDATE;
                        console.log(__update);
                        let __updater = () => {
                            if (__update) {
                                __update();
                            }
                            requestAnimationFrame(__updater);
                        };
                        requestAnimationFrame(__updater);
                    };
                </script>
            </body>

            </html>
        `;

        static export(code: string): string {
            console.group("export:");
            console.log(code);
            console.groupEnd();
            // console.log('code', code);

            // let win = window.open('about:blank', '_blank');
            let data2 = this.data.replace('/** script here **/', code);
            return data2;

            // let iframe = document.body.querySelector('iframe') as HTMLIFrameElement;
            // let doc = iframe.contentWindow.document;
            // doc.open();
            // doc.write(data2);
            // doc.close();

            // console.log('data2', data2);

            // setTimeout(() => {
            //     win.document.open();
            //     win.document.write(data2);
            //     win.document.close();
            //     console.log('writing');
            // }, 100);

            // let link = (document.body.querySelector('a.run') as HTMLLinkElement);
            // link.href = './play.html?code=' +
            //     encodeURIComponent(data2);

            // window.open('data:text/html;charset=utf-8,' +
            //     encodeURIComponent(data2)
            // );
        }
    }
}
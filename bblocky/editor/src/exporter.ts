namespace ha.blockly {
    export class Export {
        static readonly beUrl = `./js/be.js`;
        static readonly beUrlProd = `https://forkhub.github.io/blockly/js/be.js`;
        static readonly dataTemplate = `
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
        `;

        static readonly dataHtml = `
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,
        target-densityDpi=device-dpi">
    <title>Basic Blockly</title>
</head>

<body>
    <canvas></canvas>

    <!-- copy be.js script to your local to help save bandwith, thanks -->
    <script src="<!--be-js-here-->"></script>

    <!-- main  -->
    <script>
        /** template **/
    </script>
</body>

</html>
        `;

        static export(code: string, prod: boolean = false): string {
            console.group("export:");
            console.log(code);
            console.groupEnd();

            let data2 = this.dataHtml.replace('<!--be-js-here-->', prod ? this.beUrlProd : this.beUrl);
            data2 = data2.replace('/** template **/', this.dataTemplate);
            data2 = data2.replace('/** script here **/', code);
            debugger

            return data2;
        }
    }
}
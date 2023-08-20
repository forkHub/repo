declare var update: any;
declare var Update: any;
declare var UPDATE: any;

window.onload = () => {
    console.log('start');

    /** script here **/

    let __update: () => void; // = update || Update || UPDATE as any;
    if (typeof update === "function") __update = update;
    if (typeof Update === "function") __update = Update;
    if (typeof UPDATE === "function") __update = UPDATE;

    console.log(__update);

    let __updater = () => {
        if (__update) {
            __update();
        }
        requestAnimationFrame(__updater);
    }

    requestAnimationFrame(__updater);
}
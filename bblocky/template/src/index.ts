declare var _update: any;
declare var Update: any;
declare var UPDATE: any;

window.onload = () => {
    console.log('start');

    /** script here **/

    let __update: () => void; // = update || Update || UPDATE as any;
    if (typeof _update === "function") __update = _update;

    console.log(__update);

    let __updater = () => {
        if (__update) {
            __update();
        }
        requestAnimationFrame(__updater);
    }

    requestAnimationFrame(__updater);
}

window.onload = () => {
    console.log('start');
    let error = false;
    /** script here **/
    if (error)
        return;
    let __update; // = update || Update || UPDATE as any;
    if (typeof _update === "function")
        __update = _update;
    console.log(__update);
    let __updater = () => {
        try {
            if (__update) {
                //TODO: pre update
                __update();
                //TODO: post update
            }
            requestAnimationFrame(__updater);
        }
        catch (e) {
            e.message = 'Ada kesalahan di grup update: ' + e.message;
            handleError(e);
        }
    };
    requestAnimationFrame(__updater);
};
/* fungsi tambhan */
function handleError(e) {
    console.log(e.message);
    alert(e.message);
    //dialog
    //pesan
    //highlight
}

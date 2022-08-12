var client2;
(function (client2) {
    let api;
    let tbl;
    function log(msg) {
        console.log('client: ' + msg);
    }
    window.onload = () => {
        log('on load');
        tbl = ha.comp.Util.getEl('button.update');
        tbl.onclick = (e) => {
            e.stopPropagation();
            log('tbl click');
            updateParent()
                .then(() => {
                log('update parent selesai');
            })
                .catch((e) => {
                console.error(e);
            });
        };
    };
    function setApi(api2) {
        log('set api');
        api = api2;
    }
    client2.setApi = setApi;
    async function updateParent() {
        for (let i = 0; i < 3; i++) {
            if (api) {
                log('update parent sukses');
                break;
            }
            else {
                log('update parent delay ' + i);
            }
        }
    }
    async function update() {
        log('update');
    }
    client2.update = update;
})(client2 || (client2 = {}));

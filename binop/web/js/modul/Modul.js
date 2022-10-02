var md;
(function (md) {
    async function init() {
        await md.halModul.init();
        menuWdh.appendChild(md.halModul.tombolWdh);
        md.halModul.attach(halWdh);
    }
    md.init = init;
    function reset() {
        md.Modul.reset();
        md.halModul.reset();
    }
    md.reset = reset;
    async function load(data) {
        reset();
        md.Modul.load(data);
        for (let i = 0; i < md.Modul.daftar.length; i++) {
            await md.halModul.baru(md.Modul.daftar[i]);
        }
    }
    md.load = load;
})(md || (md = {}));

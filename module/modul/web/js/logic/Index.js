"use strict";
window.onload = () => {
    ha.modul.session.load();
    ha.modul.halModul.render();
    ha.modul.menu.ganti(KONTEK_MODUL, ha.modul.halModul.menu);
};

import { app } from "./App.js";
import { config } from "./config.js";

window.onload = () => {
    Grafis(config.panjangGrafis, config.lebargrafis);

    app.init();

    window.requestAnimationFrame(upate);
    function upate(): void {
        app.update();
        window.requestAnimationFrame(upate);
    }
};

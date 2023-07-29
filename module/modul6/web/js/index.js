import { data } from "./data.js";
import { dialog } from "./dialog.js";
import { halModule } from "./modul/halModul.js";
window.onload = () => {
    data.muat();
    halModule(document.body.querySelector('div.cont'));
    document.body.appendChild(dialog);
};

import * as kalender from "./Kalender.js";
window.onload = () => {
    document.body.appendChild(kalender.widget(9, 2022));
};

import * as kalender from "./Kalender.js";

window.onload = () => {
	document.body.appendChild(kalender.widget(8, 2022));
}
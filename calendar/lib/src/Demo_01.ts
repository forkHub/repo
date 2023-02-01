import * as kalender from "./Kalender.js";

/**
 * Demo style untuk hari ini
 */

let date: Date = new Date();
document.body.appendChild(kalender.widget(date.getMonth(), date.getFullYear()));
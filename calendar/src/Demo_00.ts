import * as kalender from "./Kalender.js";

/**
 * Demo widget simple
 */

let date: Date = new Date();
document.body.appendChild(kalender.widget(date.getMonth(), date.getFullYear()));
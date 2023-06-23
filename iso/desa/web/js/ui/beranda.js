import { ModeGeser, data } from "../data.js";
import { desa } from "../desa.js";
import { peta } from "../peta/peta.js";
import { pilihArea } from "../pilihArea.js";
function html(str) {
    let el = document.createElement('div');
    el.innerHTML = str;
    // console.log("html ", el);
    return el.firstElementChild;
}
function getEl(parent, query) {
    try {
        let el = parent.querySelector(query);
        if (!el)
            throw Error('');
        return el;
    }
    catch (e) {
        console.warn(e);
        console.log(parent);
        return null;
    }
}
function KonfirmOK() {
    let el = html(`
        <div class='menu'>
            <button class='ok'>ok</button>
        </div>
    `);
    // getEl(el, "button.batal").onclick = () => {
    //     data.modeGeser = ModeGeser.kosong;
    //     document.body.appendChild(beranda());
    // }
    getEl(el, "button.ok").onclick = () => {
        data.modeGeser = ModeGeser.kosong;
        el.parentElement.removeChild(el);
        document.body.appendChild(beranda());
        // if (pilihArea.status) {
        //     let rumah = desa.buatRumah();
        //     peta.bangungArea(rumah);
        // }
    };
    return el;
}
function KonfirmDrag() {
    let el = html(`
        <div class='menu'>
            <button class='batal'>batal</button>
            <button class='ok'>ok</button>
        </div>
    `);
    getEl(el, "button.batal").onclick = () => {
        data.modeGeser = ModeGeser.kosong;
        pilihArea.status;
        el.parentElement.removeChild(el);
        document.body.appendChild(beranda());
    };
    getEl(el, "button.ok").onclick = () => {
        data.modeGeser = ModeGeser.kosong;
        if (pilihArea.status) {
            let rumahAr = desa.buatRumah();
            peta.bangungArea(rumahAr);
        }
        el.parentElement.removeChild(el);
        document.body.appendChild(beranda());
    };
    return el;
}
export function beranda() {
    let el = html(`
        <div class='menu'>
            <button class='geser'>geser</button>&nbsp;
            <button class='drag'>drag</button>
        </div>
    `);
    console.log(el);
    getEl(el, "button.geser").onclick = () => {
        data.modeGeser = ModeGeser.peta;
        el.parentElement.removeChild(el);
        document.body.appendChild(KonfirmOK());
    };
    getEl(el, "button.drag").onclick = () => {
        data.modeGeser = ModeGeser.drag;
        el.parentElement.removeChild(el);
        document.body.appendChild(KonfirmDrag());
    };
    return el;
}

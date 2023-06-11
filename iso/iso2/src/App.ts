import { EventEnum, EventGen, InputTap, SpriteDimuat, event } from "./Event.js";
import { ModeGeser, data } from "./data.js";
import { desa } from "./desa.js";
import { peta } from "./peta/peta.js";
import { pilihArea } from "./pilihArea.js";
import { beranda } from "./ui/beranda.js";

class App {

    constructor() {

    }

    load() {
        data.ubinSpr = Muat("./gbr/ubin.png", false, 0, () => {
            EventGen.evt<SpriteDimuat>({
                spr: data.ubinSpr,
                type: EventEnum.sprite_dimuat
            })
        });
        Handle(data.ubinSpr, 32, 0);

        data.kursorSpr = Muat("./gbr/ubin_cursor.png");
        Handle(data.kursorSpr, 32, 0);
    }

    init() {
        peta.init();
        desa.init();
        this.initSubs();
        this.load();

        //UI
        document.body.appendChild(beranda());
    }

    initSubs(): void {

        //selesai drag area
        // event.subs.push(new EventSub<DragSelesai>(
        //     EventEnum.drag_selesai,
        //     (evt: DragSelesai) => {
        //         data.area.x1 = evt.x1;
        //         data.area.y1 = evt.y1;
        //         data.area.x2 = evt.x2;
        //         data.area.y2 = evt.y2;
        //     }
        // ));


    }

    update(): void {
        event.update();
        this.inputUpdate();
        pilihArea.update();
        this.render();
    }

    render() {
        Bersih();
        peta.render();
        pilihArea.render();
    }

    inputUpdate() {

        if (JmlTap()) {
            EventGen.evt<InputTap>({
                type: EventEnum.input_tap,
                x: InputX(),
                y: InputY()
            })
        }

        if (JmlDragSelesai()) {
            pilihArea.dragSelesai();
        }

        if (data.modeGeser == ModeGeser.peta) {
            this.geserViewport();
        }
        else if (data.modeGeser == ModeGeser.drag) {
            //kosong
        }
        else if (data.modeGeser == ModeGeser.kosong) {
            //kosong
        }
    }

    /**
     * geser viewport
     */
    geserViewport() {

        //jika sedang dipencet
        if (Pencet()) {

            //jika status belum digeser
            //aktifkan status pencet
            //simpan posisi awal
            if (data.vp.dipencet == false) {
                data.vp.dipencet = true;
                data.vp.xs = data.vp.x;
                data.vp.ys = data.vp.y;
            }
        }
        else {

            //bila tidak sedang dipencet, reset status pencet
            data.vp.dipencet = false;
        }

        //bila sedang menggeser 
        if (Geser()) {

            //bila statusnya lagi dipencet
            //update posisi
            if (data.vp.dipencet) {
                data.vp.x = data.vp.xs - GeserX();
                data.vp.y = data.vp.ys - GeserY();
            }
        }
    }

}

export const app: App = new App();
export class EventSub {
    type;
    f;
    constructor(type, f) {
        this.type = type;
        this.f = f;
    }
}
export class EventGen {
    tipe;
    data;
    f;
    static evt(data) {
        let evt = new EventGen();
        evt.data = data;
        event.buat(evt);
        return evt;
    }
}
export var EventEnum;
(function (EventEnum) {
    EventEnum["sprite_dimuat"] = "sprite/dimuat";
    EventEnum["drag_selesai"] = "drag/selesai";
    EventEnum["input_tap"] = "input/tap";
    EventEnum["rumah_baru"] = "rumah/baru";
})(EventEnum || (EventEnum = {}));
class Event {
    daftar = [];
    subs = [];
    buat(evt) {
        console.log('buat event');
        this.daftar.push(evt);
    }
    update() {
        while (this.daftar.length > 0) {
            let evt = this.daftar.pop();
            this.subs.forEach((item) => {
                if (item.type == evt.data.type) {
                    item.f(evt.data);
                }
            });
        }
    }
}
export const event = new Event();
/**
 * daftar event
 */
// export class DragSelesai implements EventType {
//     type: EventEnum = EventEnum.drag_selesai;
//     x1: number;
//     y1: number;
//     x2: number;
//     y2: number;
//     constructor(x1: number, y1: number, x2: number, y2: number) {
//         this.x1 = x1;
//         this.x2 = x2;
//         this.y1 = y1;
//         this.y2 = y2;
//     }
// }
export class SpriteDimuat {
    type;
    spr;
    constructor(spr) {
        this.spr = spr;
    }
}
export class InputTap {
    type;
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export class RumahBaru {
    type;
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

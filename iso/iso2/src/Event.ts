export interface IEvent<T> {
    data?: T;
}

export interface ISubs<T> {
    type: EventEnum,
    f: (data: T) => void;
}

export interface EventType {
    type: EventEnum;
}

export class EventSub<T> implements ISubs<T> {
    type: EventEnum;
    f: (data: T) => void;

    constructor(type: EventEnum, f: (evt: T) => void) {
        this.type = type;
        this.f = f;
    }
}

export class EventGen implements IEvent<any> {
    tipe: string;
    data?: any;
    f?: (data: any) => void;

    static evt<T2>(data: T2): EventGen {
        let evt: EventGen = new EventGen();
        evt.data = data;
        event.buat(evt);
        return evt;
    }

}

export enum EventEnum {
    sprite_dimuat = 'sprite/dimuat',
    drag_selesai = 'drag/selesai',
    input_tap = 'input/tap',
    rumah_baru = 'rumah/baru',
}

class Event {
    readonly daftar: IEvent<any>[] = [];
    readonly subs: ISubs<any>[] = [];

    buat(evt: IEvent<any>) {
        console.log('buat event');
        this.daftar.push(evt);
    }

    update() {
        while (this.daftar.length > 0) {
            let evt: IEvent<EventType> = this.daftar.pop();
            this.subs.forEach((item: ISubs<any>) => {
                if (item.type == evt.data.type) {
                    item.f(evt.data);
                }
            })
        }
    }
}

export const event: Event = new Event();

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

export class SpriteDimuat implements EventType {
    type: EventEnum.sprite_dimuat;
    spr: ISprite;

    constructor(spr: ISprite) {
        this.spr = spr;
    }

}

export class InputTap implements EventType {
    type: EventEnum.input_tap;
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class RumahBaru implements EventType {
    type: EventEnum.rumah_baru;
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
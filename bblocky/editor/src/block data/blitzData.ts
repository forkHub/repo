///<reference path="../toolboxType.ts"/>

namespace ha.blockly.BlitzData {

    export const list: TToolBoxBlockDef[] = [];

    // ha.be.Be.Grafis
    export const Grafis: TToolBoxBlockDef = {
        type: "ha.be.Be.Grafis",
        perintah: "Graphics",
        message0: "Graphics %1 width: %2 height: %3",
        inputsInline: true,
        args: {
            dummy: '',
            width: 320,
            height: 240
        },
        tooltip: `
            Initialize graphics.
            Use this block as the first block in your appp.
            width: prefered canvas width
            height: prefered canvas height
        `
    };
    list.push(Grafis);

    // ha.be.Be.Bersih
    list.push({
        type: "ha.be.Be.Bersih",
        perintah: "Cls",
        message0: 'Cls',
        tooltip: "Clear the screen"
    });

    // Color
    //ha.be.Be.Warna;
    list.push({
        type: "ha.be.Be.Warna",
        perintah: "Color",
        message0: 'Set Fill Color to red %1 green %2 blue %3 alpha %4',
        inputsInline: true,
        args: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 100
        },
        tooltip: `
            Set default fill color:
        `
    });

    // const Stroke = ha.be.Be.StrokeColor;    
    list.push({
        type: " ha.be.Be.StrokeColor",
        perintah: "Stroke",
        message0: 'Set Stroke Color to red %1 green %2 blue %3 alpha %4',
        inputsInline: true,
        args: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 100
        },
        tooltip: `
            Set default stroke color:
        `
    });

    // const Line = ha.be.Be.Garis;
    list.push({
        type: "ha.be.Be.Garis",
        perintah: "Line",
        message0: 'Draw Line x1 %1 y1 %2 x2 %3 y2 %4',
        inputsInline: true,
        args: {
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 100
        },
        tooltip: `
            Draw Line
        `
    });

    // const Rect = ha.be.Be.Kotak;
    // Rect
    list.push({
        type: "ha.be.Be.Kotak",
        perintah: "Rect",
        message0: 'Draw Rect x1 %1 y1 %2 x2 %3 y2 %4',
        inputsInline: true,
        args: {
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 100
        },
        tooltip: `
            Draw Rectangle
        `
    });

    // const Rect = ha.be.Be.Kotak_opt;
    // Rect
    list.push({
        type: "ha.be.Be.Kotak",
        perintah: "Rect",
        message0: 'Draw Rect x1 %1 y1 %2 x2 %3 y2 %4 fill %5 stroke %6',
        inputsInline: true,
        args: {
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 100,
            fill: 100,
            stroke: 100,
        },
        tooltip: `
            Draw Rectangle
        `
    });


    // const GetPixel = ha.be.Img.AmbilPiksel;
    list.push({
        type: "ha.be.Img.AmbilPiksel",
        perintah: "GetPixel",
        message0: 'Get Pixel at x %1 y %2',
        inputsInline: true,
        args: {
            x: 0,
            y: 0,
        },
        tooltip: `
            Get Pixel Color at x,y position
        `
    });

    // const Red = ha.be.Be.Merah;
    // const Green = ha.be.Be.Hijau;
    // const Blue = ha.be.Be.Biru;
    // const Alpha = ha.be.Be.Transparan;    

}

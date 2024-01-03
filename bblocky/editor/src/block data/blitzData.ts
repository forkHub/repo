///<reference path="../toolboxType.ts"/>

namespace ha.blockly.BlitzData {

    export const list: TToolBoxBlockDef[] = [];

    // Start
    list.push({
        type: "ha.be.Be.Start",
        perintah: "Graphics",
        message0: "🛩️ Start %1 width: %2 height: %3 %4",
        inputsInline: true,
        args: {
            dummy: '',
            width: 320,
            height: 240,
            statement: ""
        },
        stmt: false,
        tooltip: `
            Start Application.
            Use this block as the first block in your appp.
            width: prefered canvas width
            height: prefered canvas height
        `
    });

    // Update
    list.push({
        type: "ha.be.Be.Update",
        perintah: "function update",
        message0: "⏱️ update %1 %2 %3",
        inputsInline: false,
        args: {
            dummy: "",
            input_end_row: "",
            statement: ""
        },
        stmt: true,
        hat: true,
        tooltip: `
            Start Application.
            Use this block as the first block in your appp.
            width: prefered canvas width
            height: prefered canvas height
        `
    });

    // list.push(
    //     {
    //         "type": "block_type",
    //         "message0": "test %1 %2",
    //         "perintah": "test",
    //         "args0": [
    //             {
    //                 "type": EArgType.input_end_row
    //             },
    //             {
    //                 "type": EArgType.statementValue,
    //                 "name": "NAME"
    //             }
    //         ],
    //         "colour": 230,
    //         "tooltip": "",
    //         "helpUrl": ""
    //     })

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
        type: "ha.be.Be.Kotak_opt",
        perintah: "Rect",
        message0: 'Draw Rect x1 %1 y1 %2 x2 %3 y2 %4 fill %5 stroke %6',
        inputsInline: true,
        args: {
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 100,
            fill: true,
            stroke: true,
        },
        tooltip: `
            Draw Rectangle
        `
    });

    // const Oval = ha.be.Be.Oval;
    list.push({
        type: "ha.be.Be.Oval",
        perintah: "Oval",
        message0: 'Draw Oval %1 x %2 y %3 radius %4 scaleX %5 scaleY %6 rotation %7',
        args: {
            dummy: '',
            x1: 0,
            y1: 0,
            radius: 100,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
        },
        tooltip: `
            Draw Oval 
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
            Get Pixel Color at x, y position.
            You can get the red, green, blue element by calling the Red, Green, Blue command respectively
        `
    });

    // const Red = ha.be.Be.Merah;
    list.push({
        type: "ha.be.Be.Merah",
        perintah: "Red",
        message0: 'Red',
        tooltip: `
            Return the red color of the previous GetPixel command
        `,
        output: EOutput.Number
    });

    // const Green = ha.be.Be.Hijau;
    list.push({
        type: "ha.be.Be.Hijau",
        perintah: "Green",
        message0: 'Green',
        tooltip: `
            Return the Green color from the previous GetPixel command
        `,
        output: EOutput.Number

    });

    // const Blue = ha.be.Be.Biru;
    list.push({
        type: "ha.be.Be.Biru",
        perintah: "Blue",
        message0: 'Blue',
        tooltip: `
            Return the blue blue from the previous GetPixel command
        `,
        output: EOutput.Number

    });

    // const Alpha = ha.be.Be.Transparan;    
    list.push({
        type: "ha.be.Be.Transparan",
        perintah: "Alpha",
        message0: 'Alpha',
        tooltip: `
            Return the transparent color from the previous GetPixel command
        `,
        output: EOutput.Number

    });

}

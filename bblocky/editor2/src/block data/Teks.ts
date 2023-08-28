import { TToolBoxBlockDef } from "../toolboxType";

export class Teks {
    static readonly list: TToolBoxBlockDef[] = [];
    static readonly group = "text";

    static init() {

        //comment
        Teks.list.push({
            type: '//',
            message0: "comment %1",
            args: {
                text: "this is a comment"
            },
            inputsInline: true
        });


        // ha.bbjs.text.Text
        // ha.bbjs.Text.Text
        Teks.list.push({
            type: 'ha.bbjs.Text.Text',
            message0: "Print %1 x %2 y %3 text %4",
            args: {
                dummy: '',
                x: 0,
                y: 0,
                text: "Hello"
            },
            inputsInline: true
        });

    }

}
Teks.init();

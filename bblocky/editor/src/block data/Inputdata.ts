namespace ha.blockly.InputBlockData {
    export const list: TToolBoxBlockDef[] = [];
    export const group = "Input";

    // ha.be.Input.InputHit;
    // InputHit
    list.push({
        type: "ha.be.Input.InputHit",
        perintah: "InputHit",
        message0: "InputHit",
        tooltip: "return how many time an input is pressed since the last call",
        output: EOutput.Number
    })

    // ha.be.Input.InputX;
    list.push({
        type: "ha.be.Input.InputX",
        perintah: "InputX",
        message0: "InputX",
        tooltip: "return the x position of input",
        output: EOutput.Number
    })

    // ha.be.Input.InputY
    list.push({
        type: "ha.be.Input.InputY",
        perintah: "InputY",
        message0: "InputY",
        tooltip: "return the y position of input",
        output: EOutput.Number
    })

    //Input extended
    // ===========

    // ha.be.Input.Pencet
    list.push({
        type: "ha.be.Input.Pencet",
        perintah: "InputIsDown",
        message0: "InputIsDown",
        tooltip: "return true if an input is pressed",
        output: EOutput.Boolean
    })

    // const GeserX = ha.be.Input.GeserX;
    list.push({
        type: "ha.be.Input.GeserX",
        perintah: "DragX",
        message0: "InputDragX",
        tooltip: "return how much input is dragged in x axis",
        output: EOutput.Boolean
    })

    // const DragY = ha.be.Input.GeserY;
    list.push({
        type: "ha.be.Input.GeserY",
        perintah: "DragY",
        message0: "DragY",
        tooltip: "return how much input is dragged in y axis",
        output: EOutput.Number
    })

    // const IsDragged = ha.be.Input.Geser;
    list.push({
        type: "ha.be.Input.Geser",
        perintah: "InputIsDragged",
        message0: "InputIsDragged",
        tooltip: "return true if input is dragged",
        output: EOutput.Boolean
    })

    // const InputType = ha.be.Input.InputType;
    // const TapCount = ha.be.Input.JmlTap;
    // const DragStartCount = ha.be.Input.JmlDragMulai;
    // const DragEndCount = ha.be.Input.JmlDragSelesai;
    // const DragStartX = ha.be.Input.InputXAwal;
    // const DragStartY = ha.be.Input.InputYAwal;


}



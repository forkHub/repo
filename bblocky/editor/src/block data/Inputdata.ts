namespace ha.blockly.InputBlockData {
    export const list: TToolBoxBlockDef[] = [];

    // LoadAnimImage
    // ha.be.Spr.MuatAnimasi
    list.push({
        type: "ha.be.Spr.MuatAnimasi",
        message0: "LoadAnimImage %1 image: %2 frame width: %3 frame height: %4",
        perintah: "ha.be.Spr.MuatAnimasi",
        args: {
            dummy: '',
            sprite: {},
            fw: 32,
            fh: 32
        },
        output: EOutput.Any
    })

}

// const InputHit = ha.be.Input.InputHit;
// const InputX = ha.be.Input.InputX;
// const InputY = ha.be.Input.InputY;
// const FlushInput = ha.be.Input.FlushInput;
// const Pencet = ha.be.Input.Pencet;

// //extended
// const GeserX = ha.be.Input.GeserX;
// const GeserY = ha.be.Input.GeserY;
// const Geser = ha.be.Input.Geser;
// const InputType = ha.be.Input.InputType;
// const JmlTap = ha.be.Input.JmlTap;
// const JmlDragMulai = ha.be.Input.JmlDragMulai;
// const JmlDragSelesai = ha.be.Input.JmlDragSelesai;
// const InputXAwal = ha.be.Input.InputXAwal;
// const InputYAwal = ha.be.Input.InputYAwal;
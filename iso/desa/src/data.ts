export enum ModeGeser {
    kosong = 'kosong',
    peta = 'peta',
    drag = 'drag'
}

class Data {
    private _ubin: ISprite; //gambar ubin buat peta
    private _modeGeser: ModeGeser = ModeGeser.kosong;
    private _kursorSpr: ISprite; // 

    /** area drag terakhir */
    readonly area = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    }

    // /buat viewport
    //untuk menentukan area yang terlihat di layar
    readonly vp = {
        x: -120,
        y: 0,

        dipencet: false,	//apakah user sedang menggeser layar
        xs: 0,	//posisi x awal viewport saat pointer dipencet
        ys: 0	//posisi y awal viewport saat pointer dipencet
    }

    //digunakan untuk menyimpan proyeksi terakhir dari iso ke layar
    readonly layarPos = {
        x: 0,
        y: 0,
    }

    //digunakan untuk menyimpan hasi proyeksi terakhir
    readonly isoPos = {
        x: 0,
        y: 0,

        xgr: 0,
        ygr: 0
    }

    //TODO: dipakai di PilihArea, kemungkinan dipindah
    readonly isoDrag = {
        status: false, //status drag
        // ctr: 0,

        xgr: 0,	//posisi grid x awal drag
        ygr: 0, //posisi grid y awal drag

        x2gr: 0, //posisi grid x akhir drag
        y2gr: 0  //posisi grid y akhir drag
    }


    public get kursorSpr(): ISprite {
        return this._kursorSpr;
    }
    public set kursorSpr(value: ISprite) {
        this._kursorSpr = value;
    }

    public get modeGeser(): ModeGeser {
        return this._modeGeser;
    }
    public set modeGeser(value: ModeGeser) {
        this._modeGeser = value;
    }

    public get ubinSpr(): ISprite {
        return this._ubin;
    }

    public set ubinSpr(value: ISprite) {
        this._ubin = value;
    }
}

export const data: Data = new Data();
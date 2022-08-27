class Tombol {
    constructor(label) {
        this._label = '';
        this._view = document.createElement('button');
        this._view.innerText = label;
        this._label = label;
    }
    static init() {
        this.buat(this.DOT);
        this.buat(this.DEBUG);
        this.buat(this.PILIH);
        this.buat(this.OK);
        this.buat(this.BATAL);
        this.buat(this.GESER);
        this.buat(this.PIVOT);
        this.buat(this.SKALA);
        this.buat(this.PUTAR);
    }
    static getById(label) {
        let hasil;
        this.daftar.forEach((item) => {
            if (item.label == label) {
                hasil = item;
                return;
            }
        });
        if (!hasil) {
            throw Error('hasil tidak ketemu');
        }
        return hasil;
    }
    static buat(label) {
        let hasil;
        hasil = new Tombol(label);
        this.push(hasil);
        return hasil;
    }
    static push(tbl) {
        this.daftar.push(tbl);
        //TODO: validate
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
}
Tombol.DOT = 'dot';
Tombol.PILIH = 'pilih';
Tombol.DEBUG = 'debug';
Tombol.OK = 'ok';
Tombol.BATAL = 'batal';
Tombol.GESER = 'geser';
Tombol.SKALA = 'skala';
Tombol.PUTAR = 'putar';
Tombol.PIVOT = 'pivot';
Tombol.daftar = [];
class Point {
    constructor() {
        this._x = 0;
        this._y = 0;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    static toObj(p) {
        return {
            x: p.x,
            y: p.y
        };
    }
}
///<reference path="Point.ts"/>
class Geom {
    constructor() {
        Geom.RAD2DEG; //TODO:
    }
    static get hasil() {
        return Geom._hasil;
    }
    static rotateRel(p, t, deg = 10) {
        let xr = p.x - t.x;
        let yr = p.y - t.y;
        let x1;
        let y1;
        deg *= this.DEG2RAD;
        x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
        y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
        this._hasil.x = x1 + t.x;
        this._hasil.y = y1 + t.y;
        // console.group('rotasi');
        // console.log(p);
        // console.log(this._hasil);
        // console.groupEnd();
    }
}
Geom.RAD2DEG = 180.0 / Math.PI;
Geom.DEG2RAD = Math.PI / 180.0;
Geom._hasil = new Point();
///<reference path="Geom.ts"/>
///<reference path="Point.ts"/>
class Dot {
    constructor() {
        this._id = 0;
        this._indukId = 0;
        this._rotasi = 0;
        this._pos = new Point();
        this._id = Id.id;
        this._posGlobal = new Point();
        this._skalaGlobal = new Point();
        this._rotasiGlobal = 0;
        this._skala = new Point();
        this._skala.x = 1;
        this._skala.y = 1;
    }
    static hapusPivot(dot) {
        Dot.lokal2global(dot);
        dot.pos.x = dot.posGlobal.x;
        dot.pos.y = dot.posGlobal.y;
        dot.skala.x = dot.skalaGlobal.x;
        dot.skala.y = dot.skalaGlobal.y;
        dot.rotasi = dot.rotasiGlobal;
        dot.indukId = 0;
        // this._daftar.forEach((item: IDot) => {
        // 	if (item.indukId == dot.id) {
        // 		this.setPivot(item.id, dot.id);
        // 	}
        // })
    }
    static setPivot(id1, id2) {
        if (id1 == id2) {
            console.log('batal');
            return;
        }
        let dot = Dot.getById(id1);
        let dot2 = Dot.getById(id2);
        let posRelX = 0;
        let posRelY = 0;
        Dot.hapusPivot(dot);
        Dot.lokal2global(dot2);
        Dot.lokal2global(dot);
        console.group('set pivot, src: ' + id1 + '/target: ' + id2);
        console.log(dot);
        console.log(dot2);
        //putaran posisi
        Geom.rotateRel(dot.posGlobal, dot2.posGlobal, -dot2.rotasiGlobal);
        // console.log('rotasi ' + -dot2.rotasi);
        dot.posGlobal.x = Geom.hasil.x;
        dot.posGlobal.y = Geom.hasil.y;
        //skala posisi
        posRelX = dot.posGlobal.x - dot2.posGlobal.x;
        posRelY = dot.posGlobal.y - dot2.posGlobal.y;
        posRelX /= dot2.skalaGlobal.x;
        posRelY /= dot2.skalaGlobal.y;
        //posisi
        dot.pos.x = posRelX;
        dot.pos.y = posRelY;
        //skala relative
        dot.skala.x = dot.skalaGlobal.x / dot2.skalaGlobal.x;
        dot.skala.y = dot.skalaGlobal.y / dot2.skalaGlobal.y;
        dot.rotasi = dot.rotasiGlobal - dot2.rotasiGlobal;
        dot.indukId = id2;
        console.groupEnd();
        //update child
        this._daftar.forEach((item) => {
            if (item.indukId == id1) {
                this.setPivot(item.id, id1);
            }
        });
    }
    static lokal2global(dot) {
        dot.posGlobal.x = dot.pos.x;
        dot.posGlobal.y = dot.pos.y;
        dot.skalaGlobal.x = dot.skala.x;
        dot.skalaGlobal.y = dot.skala.y;
        dot.rotasiGlobal = dot.rotasi;
        if (dot.indukId > 0) {
            let dot2 = this.getById(dot.indukId);
            Dot.lokal2global(dot2);
            //skala posisi
            dot.posGlobal.x *= dot2.skalaGlobal.x;
            dot.posGlobal.y *= dot2.skalaGlobal.y;
            dot.posGlobal.x += dot2.posGlobal.x;
            dot.posGlobal.y += dot2.posGlobal.y;
            //rotasi posisi
            Geom.rotateRel(dot.posGlobal, dot2.posGlobal, dot2.rotasiGlobal);
            dot.posGlobal.x = Geom.hasil.x;
            dot.posGlobal.y = Geom.hasil.y;
            //skala global
            dot.skalaGlobal.x = dot.skala.x * dot2.skalaGlobal.x;
            dot.skalaGlobal.y = dot.skala.y * dot2.skalaGlobal.y;
            //rotasi global
            dot.rotasiGlobal = dot.rotasi + dot2.rotasiGlobal;
        }
    }
    static resetDipilih() {
        // ha.comp.Util.stackTrace();
        this._dipilih = null;
    }
    static getById(id) {
        let hasil;
        this._daftar.forEach((item) => {
            if (item.id == id) {
                hasil = item;
            }
        });
        return hasil;
    }
    static collided(x, y) {
        let hasil = 0;
        this._daftar.forEach((item) => {
            if (this.collide(item, x, y)) {
                hasil = item.id;
            }
        });
        // this._dipilih = hasil.id;
        return hasil;
    }
    static renderBox(ctx, x, y, rad, clr) {
        ctx.beginPath();
        ctx.strokeStyle = (clr);
        ctx.rect(x - rad, y - rad, rad * 2, rad * 2);
        ctx.stroke();
        // ctx.save();
        // ctx.translate(x, y);
        // ctx.rotate(img.rotation * (Math.PI / 180));
        // ctx.drawImage(img.img, frameX, frameY, img.frameW, img.frameH, - img.handleX, -img.handleY, w2, h2);
        // ctx.restore();		
    }
    static render(dot, ctx) {
        this.lokal2global(dot);
        this.renderBox(ctx, dot.posGlobal.x, dot.posGlobal.y, 7, '#000');
        //render dipilih
        if (Dot.dipilih && (dot.id == Dot.dipilih)) {
            this.renderBox(ctx, dot.posGlobal.x, dot.posGlobal.y, 5, '0000ff');
        }
        //render target
        if (Dot._target == dot.id) {
            this.renderBox(ctx, dot.posGlobal.x, dot.posGlobal.y, 5, '#00ff00');
        }
    }
    static buat(x, y, indukId) {
        let hasil;
        hasil = new Dot();
        hasil.pos.x = x;
        hasil.pos.y = y;
        hasil.indukId = indukId;
        this._daftar.push(hasil);
        setTimeout(() => {
            this._onTambah();
        }, 0);
        return hasil.id;
    }
    static collide(d, x, y) {
        this.lokal2global(d);
        if (Math.abs(d.posGlobal.x - x) < 7) {
            if (Math.abs(d.posGlobal.y - y) < 7) {
                return true;
            }
        }
        return false;
    }
    get skalaGlobal() {
        return this._skalaGlobal;
    }
    set skalaGlobal(value) {
        this._skalaGlobal = value;
    }
    get rotasiGlobal() {
        return this._rotasiGlobal;
    }
    set rotasiGlobal(value) {
        this._rotasiGlobal = value;
    }
    static get daftar() {
        // console.log(this.daftar);
        return Dot._daftar.slice();
    }
    get pos() {
        return this._pos;
    }
    set pos(value) {
        this._pos = value;
    }
    static get onTambah() {
        return Dot._onTambah;
    }
    static set onTambah(value) {
        Dot._onTambah = value;
    }
    static get dipilih() {
        return Dot._dipilih;
    }
    static set dipilih(value) {
        Dot._dipilih = value;
    }
    static get jml() {
        return Dot._daftar.length;
    }
    get id() {
        return this._id;
    }
    static get target() {
        return Dot._target;
    }
    static set target(value) {
        Dot._target = value;
    }
    get indukId() {
        return this._indukId;
    }
    set indukId(value) {
        this._indukId = value;
    }
    get rotasi() {
        return this._rotasi;
    }
    set rotasi(value) {
        this._rotasi = value;
    }
    get skala() {
        return this._skala;
    }
    set skala(value) {
        this._skala = value;
    }
    get posGlobal() {
        return this._posGlobal;
    }
    set posGlobal(value) {
        this._posGlobal = value;
    }
}
Dot._daftar = [];
class Id {
    static get id() {
        if (this._base <= 0) {
            this._base = Date.now();
        }
        this._base++;
        return this._base;
    }
}
Id._base = 0;
///<reference path="./Id.ts"/>
class State {
    constructor(nama) {
        this._id = 0;
        this._nama = '';
        this._trans = [];
        this._id = Id.id;
        this._nama = nama;
    }
    static init() {
        this.buat(State.IDLE);
        this.buat(State.PILIH);
        this.buat(State.DIPILIH);
        this.buat(State.PILIH_PIVOT);
        this.buat(State.GESER);
        this.buat(State.SKALA);
        this.buat(State.PUTAR);
        // this.ganti(this.getByNama(State.IDLE));
    }
    static getHistory() {
        let hasil = '';
        this._history.forEach((item) => {
            hasil += '/' + item;
        });
        return hasil;
    }
    static getByNama(nama) {
        let hasil;
        this.slice.forEach((item) => {
            if (item.nama == nama) {
                hasil = item;
                return;
            }
        });
        return hasil;
    }
    static buat(nama) {
        let state;
        state = new State(nama);
        this._daftar.push(state);
        return state;
    }
    static ganti(state) {
        while (this._history.length > 0) {
            this._history.pop();
        }
        this.push(state);
    }
    static push(state) {
        this._aktif = state;
        this._history.push(state);
        setTimeout(() => {
            this._onChange();
        }, 0);
    }
    static pop() {
        if (this._history.length == 0)
            return;
        this._history.pop();
        this._aktif = this._history[this._history.length - 1];
        setTimeout(() => {
            this._onChange();
        }, 0);
    }
    static get slice() {
        return this._daftar.slice();
    }
    static get aktif() {
        return this._aktif;
    }
    static get onChange() {
        return this._onChange;
    }
    static set onChange(value) {
        this._onChange = value;
    }
    get trans() {
        return this._trans;
    }
    set trans(value) {
        this._trans = value;
    }
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
}
State.IDLE = 'idle';
State.PILIH = 'pilih';
State.DIPILIH = 'dipilih';
State.GESER = 'geser';
State.SKALA = 'skala';
State.PUTAR = 'putar';
State.PILIH_PIVOT = 'pilih_pivot';
State._daftar = [];
State._history = [];
class Input {
    static get onPencet() {
        return Input._onPencet;
    }
    static set onPencet(value) {
        Input._onPencet = value;
    }
    static get onTap() {
        return Input._onTap;
    }
    static set onTap(value) {
        Input._onTap = value;
    }
    static get onDrag() {
        return Input._onDrag;
    }
    static set onDrag(value) {
        Input._onDrag = value;
    }
    static get onStateChange() {
        return Input._onStateChange;
    }
    static set onStateChange(value) {
        Input._onStateChange = value;
    }
    static init(kanvas) {
        kanvas.onpointerdown = (e) => {
            Input._mState = Input.M_PENCET;
            Input.mPencetX = e.clientX;
            Input.mPencetY = e.clientY;
            Input._clientX = e.clientX;
            Input._clientY = e.clientY;
            setTimeout(() => {
                Input.onPencet();
            }, 0);
        };
        kanvas.onpointermove = (e) => {
            Input._clientX = e.clientX;
            Input._clientY = e.clientY;
            if (Input._mState == Input.M_PENCET) {
                let dragX = e.clientX - Input.mPencetX;
                let dragY = e.clientY - Input.mPencetY;
                let p = (Math.abs(dragX) + Math.abs(dragY));
                if (p > 5) {
                    Input._mState = Input.M_DRAG;
                    Input.stateChange();
                }
            }
            else if (Input._mState == Input.M_DRAG) {
                Input._mDragX = e.clientX - Input.mPencetX;
                Input._mDragY = e.clientY - Input.mPencetY;
                Input._clientX = e.clientX;
                if (Input._onDrag) {
                    Input._onDrag();
                }
            }
            else if (Input._mState == Input.M_IDLE) {
                Input._mState = Input.M_GERAK;
                Input.stateChange();
            }
            else if (Input._mState == Input.M_TAP) {
                Input._mState = Input.M_GERAK;
                Input.stateChange();
            }
        };
        kanvas.onpointerleave = () => {
            Input._mState = Input.M_IDLE;
            Input.stateChange();
        };
        kanvas.onpointerenter = () => {
            Input._mState = Input.M_IDLE;
            Input.stateChange();
        };
        kanvas.onpointerover = () => {
        };
        kanvas.onpointerup = () => {
            console.log('up');
            if (Input._mState == Input.M_DRAG) {
                Input._mState = Input.M_IDLE;
            }
            else if (Input._mState == Input.M_PENCET) {
                Input._mState = Input.M_TAP;
                if (Input._onTap) {
                    Input._onTap();
                }
            }
            Input.stateChange();
        };
    }
    static stateChange() {
        if (this._onStateChange) {
            this._onStateChange();
        }
    }
    static get state() {
        return Input._mState;
    }
    static get clientX() {
        return Input._clientX;
    }
    static get clientY() {
        return Input._clientY;
    }
    static get mDragX() {
        return Input._mDragX;
    }
    static get mDragY() {
        return Input._mDragY;
    }
}
Input.M_IDLE = 'idle';
Input.M_PENCET = 'pencet';
Input.M_GERAK = 'gerak';
Input.M_DRAG = 'drag';
Input.M_TAP = 'tap';
Input._mState = Input.M_IDLE;
Input.mPencetX = 0;
Input.mPencetY = 0;
Input._mDragX = 0;
Input._mDragY = 0;
Input._clientX = 0;
Input._clientY = 0;
///<reference path="ent/Tombol.ts"/>
///<reference path="ent/Dot.ts"/>
///<reference path="ent/State.ts"/>
///<reference path="ent/Input.ts"/>
///<reference path="ent/Geom.ts"/>
let canvas;
let ctx;
let tombolCont;
let flRender = false;
let stateCont;
let debugCont = document.querySelector('div.debug');
//test
let id1;
let id2;
let id3;
canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');
ctx.strokeStyle = "solid";
tombolCont = document.querySelector('div.tombol-cont');
stateCont = document.querySelector('div.state-cont');
Tombol.init();
State.init();
Input.init(canvas);
///<reference path="../OnCreate.ts"/>
//FILE: TOMBOL.TS
Tombol.getById(Tombol.DOT).view.onclick = (e) => {
    e.stopPropagation();
    Dot.buat(100, 100, 0);
};
Tombol.getById(Tombol.DEBUG).view.onclick = (e) => {
    e.stopPropagation();
    if (!Dot.dipilih)
        return;
    let dot = Dot.getById(Dot.dipilih);
    if (dot.indukId > 0) {
        // console.log('hapus pivot');
        Dot.hapusPivot(dot);
        // console.log(dot);
    }
    else {
        console.log('set pivot ' + dot.id + '/' + id1);
        Dot.setPivot(dot.id, id1);
        console.log(dot);
    }
    flRender = true;
};
Tombol.getById(Tombol.PILIH).view.onclick = (e) => {
    e.stopPropagation();
    if (Dot.jml == 0) {
        ha.comp.dialog.tampil('Tidak ada object');
    }
    else {
        console.log('pilih klik');
        Dot.resetDipilih();
        State.push(State.PILIH);
        flRender = false;
    }
};
Tombol.getById(Tombol.OK).view.onclick = (e) => {
    e.stopPropagation();
    if (isPop(State.aktif)) {
        State.pop();
    }
    else {
        throw Error('error: ' + State.aktif);
    }
    function isPop(name) {
        if (name == State.GESER)
            return true;
        if (name == State.SKALA)
            return true;
        if (name == State.PUTAR)
            return true;
        if (name == State.PILIH)
            return true;
        return false;
    }
};
Tombol.getById(Tombol.GESER).view.onclick = (e) => {
    e.stopPropagation();
    //STATE GERAK
    State.push(State.GESER);
};
Tombol.getById(Tombol.PIVOT).view.onclick = (e) => {
    e.stopPropagation();
    State.push(State.PILIH_PIVOT);
};
Tombol.getById(Tombol.SKALA).view.onclick = (e) => {
    e.stopPropagation();
    State.push(State.SKALA);
};
Tombol.getById(Tombol.PUTAR).view.onclick = (e) => {
    e.stopPropagation();
    State.push(State.PUTAR);
};
///<reference path="../OnCreate.ts"/>
//event
Dot.onTambah = () => {
    flRender = true;
};
///<reference path="../OnCreate.ts"/>
State.onChange = () => {
    console.log('state on change: ' + State.aktif);
    let nama = State.aktif;
    tombolCont.innerHTML = '';
    //render history
    stateCont.innerHTML = State.getHistory();
    if (nama == State.IDLE) {
        tbhTombol(Tombol.DOT);
        //ada dot
        if (Dot.jml > 0) {
            tbhTombol(Tombol.PILIH);
        }
        //ada yang dipilih
        if (Dot.dipilih > 0) {
            tbhTombol(Tombol.GESER);
            tbhTombol(Tombol.SKALA);
            tbhTombol(Tombol.PUTAR);
        }
        tbhTombol(Tombol.DEBUG);
    }
    else if (nama == State.PILIH) {
        tbhTombol(Tombol.OK);
        tbhTombol(Tombol.BATAL);
    }
    else if (nama == State.DIPILIH) {
        tbhTombol(Tombol.GESER);
        tbhTombol(Tombol.PIVOT);
        tbhTombol(Tombol.OK);
    }
    else if (nama == State.GESER) {
        tbhTombol(Tombol.OK);
    }
    else if (nama == State.SKALA) {
        tbhTombol(Tombol.OK);
    }
    else if (nama == State.PUTAR) {
        tbhTombol(Tombol.OK);
    }
    else if (nama == State.PILIH_PIVOT) {
        tbhTombol(Tombol.OK);
    }
    else {
        throw Error('state error: ' + nama);
    }
    function tbhTombol(nama) {
        tombolCont.appendChild(Tombol.getById(nama).view);
    }
};
///<reference path="../OnCreate.ts"/>
let mulaiX = 0;
let mulaiY = 0;
let skalaAwalX = 1;
let skalaAwalY = 1;
let rotasiAwal = 0;
Input.onStateChange = () => {
    // console.log(kanvas.Input.state);
};
Input.onDrag = () => {
    if (!Dot.dipilih)
        return;
    let dot = Dot.getById(Dot.dipilih);
    if (State.SKALA == State.aktif) {
        let dragx = (Input.mDragX / canvas.width);
        dot.skala.x = skalaAwalX + dragx;
        dot.skala.y = skalaAwalX + dragx;
        flRender = true;
    }
    else if (State.GESER == State.aktif) {
        dot.pos.x = mulaiX + Input.mDragX;
        dot.pos.y = mulaiY + Input.mDragY;
        flRender = true;
    }
    else if (State.PUTAR == State.aktif) {
        let drag = (Input.mDragX / canvas.width) * 45;
        dot.rotasi = rotasiAwal + drag;
        let d2 = Dot.getById(id2);
        let d3 = Dot.getById(id3);
        let msg = 'd2: ' + d2.rotasiGlobal + '/d3: ' + d3.rotasiGlobal;
        debug(msg);
        flRender = true;
    }
};
Input.onPencet = () => {
    if (!Dot.dipilih)
        return;
    let dot = Dot.getById(Dot.dipilih);
    mulaiX = dot.pos.x;
    mulaiY = dot.pos.y;
    skalaAwalX = dot.skala.x;
    skalaAwalY = dot.skala.y;
    rotasiAwal = dot.rotasi;
    // console.log('mulai x' + mulaiX + '/mulai y' + mulaiY);
};
Input.onTap = () => {
    if (State.PILIH == State.aktif) {
        let dot = Dot.collided(Input.clientX, Input.clientY);
        if (dot) {
            Dot.dipilih = dot;
        }
        else {
            Dot.resetDipilih();
        }
        flRender = true;
    }
    else if (State.PILIH_PIVOT == State.aktif) {
        let dot = Dot.collided(Input.clientX, Input.clientY);
        if (dot && Dot.dipilih != dot) {
            Dot.target = dot;
        }
        flRender = true;
    }
};
///<reference path="evt/Tombol.ts"/>
///<reference path="evt/Dot.ts"/>
///<reference path="evt/State.ts"/>
///<reference path="evt/Input.ts"/>
//flow
State.ganti(State.IDLE);
requestAnimationFrame(update);
test();
//function
function debug(msg) {
    debugCont.innerHTML = msg;
}
function update() {
    if (flRender) {
        flRender = false;
        render();
    }
    requestAnimationFrame(update);
}
function render() {
    ctx.fillStyle = `rgba(255,255,255,1)`;
    ctx.fillRect(0, 0, 1000, 1000);
    Dot.daftar.forEach((item) => {
        Dot.render(item, ctx);
    });
}
function test() {
    id1 = Dot.buat(100, 100, 0);
    id2 = Dot.buat(100, 100, 0);
    id3 = Dot.buat(100, 100, 0);
    let dot2 = Dot.getById(id2);
    let dot3 = Dot.getById(id3);
    dot2.pos.x = 130;
    dot2.pos.y = 100;
    Dot.setPivot(dot2.id, id1);
    // dot2.indukId = id1;
    dot3.pos.x = 180;
    dot3.pos.y = 100;
    // dot3.indukId = id2;
    Dot.setPivot(dot3.id, id2);
}
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        // export function createComponent(template: string): BaseComponent {
        // 	let comp: BaseComponent = new BaseComponent();
        // 	comp.template = template;
        // 	comp.build();
        // 	return comp;
        // }
        class BaseComponent {
            constructor() {
                this._template = '';
                this._elHtml = document.createElement('div');
            }
            // protected get template(): string {
            // 	return this._template;
            // }
            // protected set template(value: string) {
            // 	this._template = value;
            // }
            static buat(temp) {
                let view = new BaseComponent();
                view.build(temp);
                return view;
            }
            async loadTemplate(f) {
                let http = await comp.Util.Ajax('get', f, '');
                if (200 == http.status) {
                    return http.responseText;
                }
                else {
                    throw new Error(http.responseText);
                }
            }
            destroy() {
                this.detach();
                while (this._elHtml.firstChild) {
                    this._elHtml.removeChild(this._elHtml.firstChild);
                }
                this._elHtml = null;
            }
            attach(parent) {
                parent.appendChild(this._elHtml);
                this._parent = parent;
            }
            detach() {
                // console.log('loading detach');
                // console.log(this._elHtml.parentElement);
                if (this._elHtml.parentElement) {
                    this._elHtml.parentElement.removeChild(this._elHtml);
                    return true;
                }
                return false;
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            build(temp = '') {
                let div = document.createElement('div');
                let el;
                if (temp && temp != '') {
                    this._template = temp;
                }
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                if (!this._elHtml) {
                    console.log(div);
                    console.log(this._template);
                    throw new Error('');
                }
            }
            getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            // getElFromDoc(query: string): HTMLElement {
            // 	let el: HTMLElement;
            // 	el = document.querySelector(query);
            // 	if (!el) throw new Error();
            // 	return el;
            // }
            get elHtml() {
                return this._elHtml;
            }
        }
        comp.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Dialog extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='comp dialog'>
					<div class='box'>
						<p class='deskripsi'>Contoh dialog </p>
						<button class="btn btn-primary ok">OK</button>
					</div>
				</div>
				`;
                this.build();
            }
            init() {
                this.detach();
            }
            tampil(pesan = '', def = true) {
                // ha.comp.Util.stackTrace();
                this.p.innerHTML = pesan;
                if (def) {
                    this.okTbl.onclick = () => {
                        this.detach();
                    };
                }
                this.attach(document.body);
                this._elHtml.style.display = 'block';
            }
            get okTbl() {
                return this.getEl('button.ok');
            }
            get p() {
                return this.getEl('p');
            }
        }
        comp.dialog = new Dialog();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Loading extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='loading'>
					<div class='box'>
						<img src=''/>
						<p>Memuat ...</p> 
					</div> 
				</div>
			`;
                this.build();
            }
            tampil() {
                console.log('loading tampil');
                this.attach(document.body);
            }
        }
        comp.loading = new Loading();
        console.log('exporting loading: ' + comp.loading);
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuKontek {
            constructor() {
                this.view = new View();
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'inline-block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.elHtml.appendChild(button);
            }
        }
        comp.MenuKontek = MenuKontek;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-context'>
				</div>
			`;
                this.build();
                this._elHtml.style.wordBreak = 'no-wrap';
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuPopup {
            constructor() {
                this.view = new View();
            }
            destroy() {
                this.view.destroy();
            }
            buatTombol2(t) {
                t.forEach((item) => {
                    this.buatTombol(item);
                });
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.box.appendChild(button);
            }
        }
        comp.MenuPopup = MenuPopup;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-popup' style="position:fixed; top:0px; left:0px; right:0px; bottom:0px; z-index:1000; background-color: rgba(0,0,0,.3)">
					<div class='box cont' style="position:fixed; bottom:0px; left:0px; right:0px">
					</div>
				</div>
			`;
                this.build();
                this.box.style.backgroundColor = 'white';
                this.box.style.padding = '8px';
                this.box.style.textAlign = 'center';
                this._elHtml.onclick = () => {
                    this.detach();
                };
            }
            get box() {
                return this.getEl('div.box.cont');
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Util {
            static createEl(str) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = str;
                el = div.firstElementChild;
                if (!el) {
                    console.log(div);
                    console.log(str);
                    throw new Error('');
                }
                return el;
            }
            static getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            static getEl(query, parent = null, err = true) {
                let el;
                if (!parent)
                    parent = document.body;
                el = parent.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(parent);
                    console.log(query);
                    if (err) {
                        throw new Error('query not found ');
                    }
                    else {
                        return null;
                    }
                }
            }
            static id() {
                return Date.now();
            }
            static async delay(m = 10) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, m);
                });
            }
            static stackTrace() {
                try {
                    throw Error('');
                }
                catch (e) {
                    console.error(e);
                }
            }
            static bersihDiv(div) {
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
            }
            //default error
            static error(e) {
                console.error(e);
                comp.dialog.tampil(e.message);
            }
            //shared
            static kirimWa(teks) {
                return "whatsapp://send?text=" + teks;
            }
            static getUrl(url, params) {
                let urlHasil = url;
                console.group('get url');
                console.log('url: ' + url);
                console.log('params: ' + JSON.stringify(params));
                params.forEach((item) => {
                    console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
                    urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
                    console.log('item: ' + item);
                    console.log('url: ' + urlHasil);
                });
                console.log('url hasil: ' + urlHasil);
                console.groupEnd();
                return urlHasil;
            }
            static build(temp) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = temp;
                el = div.firstElementChild;
                // this._elHtml = el;
                if (!el) {
                    console.log(div);
                    console.log(temp);
                    throw new Error('');
                }
                return el;
            }
            static async AjaxLogin(type, urlServer, dataStr, loginUrl, pf = null) {
                let xml;
                xml = await this.Ajax(type, urlServer, dataStr, pf);
                if (401 == xml.status) {
                    window.top.location.href = loginUrl;
                    return null;
                }
                else {
                    return xml;
                }
            }
            static async Ajax2(type, url, dataStr, pf = null) {
                let x = await this.Ajax(type, url, dataStr, pf);
                if (x.status == 200 || x.status == 0) {
                    return x.responseText;
                }
                console.log('error status code: ' + x.status);
                throw Error(x.responseText);
            }
            static async Ajax(type, url, dataStr, pf = null) {
                return new Promise((resolve, reject) => {
                    try {
                        console.group('send data');
                        // console.log(dataStr);
                        console.log("type " + type);
                        comp.loading.attach(document.body);
                        let xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            comp.loading.detach();
                            resolve(xhr);
                        };
                        xhr.onerror = (e) => {
                            console.log('xhr error');
                            console.log(e);
                            comp.loading.detach();
                            reject(new Error(e.message));
                        };
                        xhr.onprogress = (p) => {
                            if (pf) {
                                pf(p);
                            }
                        };
                        xhr.open(type, url + "", true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        // xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
                        // xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));
                        xhr.send(dataStr);
                        // console.log("type " + type);
                        // console.log("url " + url);
                        console.groupEnd();
                    }
                    catch (e) {
                        console.log('Util error');
                        console.log(e);
                        comp.loading.detach();
                        reject(new Error(e.message));
                    }
                });
            }
        }
        Util.sUserId = 'user_id';
        Util.sLevel = 'level';
        Util.sFilter = 'filter';
        Util.storageId = 'xyz.hagarden.tugas';
        comp.Util = Util;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
class Poligon {
    static get onBuat() {
        return Poligon._onBuat;
    }
    static set onBuat(value) {
        Poligon._onBuat = value;
    }
    static slice() {
        return this.daftar;
    }
    static render(p, ctx) {
        p.dot.forEach((n) => {
            let dot = Dot.getById(n);
            Dot.render(dot, ctx);
        });
        ctx.beginPath();
        p.dot.forEach((n, idx) => {
            let dot = Dot.getById(n);
            if (idx == 0) {
                ctx.moveTo(dot.posGlobal.x, dot.posGlobal.y);
            }
            else {
                ctx.lineTo(dot.posGlobal.x, dot.posGlobal.y);
            }
        });
        ctx.stroke();
    }
    static buatKotak(x, y) {
        let id;
        let p;
        p = {
            id: Id.id,
            dot: []
        };
        //tengah
        id = Dot.buat(x, y, 0);
        p.dot.push(id);
        //
        id = Dot.buat(-10, -10, id);
        p.dot.push(id);
        id = Dot.buat(10, -10, id);
        p.dot.push(id);
        id = Dot.buat(10, 10, id);
        p.dot.push(id);
        id = Dot.buat(-10, 10, id);
        p.dot.push(id);
        this.daftar.push(p);
        setTimeout(() => {
            this._onBuat();
        }, 0);
        return 0;
    }
}

var ha;
(function (ha) {
    class Input {
        _inputs = [];
        _touchGlobal;
        _mouseGlobal;
        _keybGlobal;
        _inputGlobal;
        _event = new Event();
        constructor() {
            this._touchGlobal = this.def();
            this._mouseGlobal = this.def();
            this._keybGlobal = this.def();
            this._inputGlobal = this.def();
            this._touchGlobal.type = 'touch';
            this._keybGlobal.type = 'keyb';
            this._mouseGlobal.type = 'mouse';
        }
        getMouseKey(e) {
            if (e.pointerType == 'touch') {
                return e.pointerId + '';
            }
            else if (e.pointerType == 'mouse') {
                return e.button + '';
            }
            throw Error('');
        }
        init(buffer) {
            buffer.canvas.onpointerdown = (e) => {
                e.stopPropagation();
                let pos = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);
                let key = this.getMouseKey(e);
                let input = ha.input.baru(key, e.pointerType);
                ha.input.event.down(input, key, e.pointerType, pos);
                ha.input.event.down(this._inputGlobal, key, e.pointerType, pos);
                if ("mouse" == e.pointerType)
                    ha.input.event.down(this._mouseGlobal, key, 'mouse', pos);
                if ("touch" == e.pointerType)
                    ha.input.event.down(this._touchGlobal, key, 'touch', pos);
            };
            buffer.canvas.onpointermove = (e) => {
                e.stopPropagation();
                let input = this.baru(e.button + '', e.pointerType);
                ha.input.event.move(input, buffer, e);
                ha.input.event.move(this.inputGlobal, buffer, e);
                if (e.pointerType == 'touch')
                    ha.input.event.move(ha.input.touchGlobal, buffer, e);
                if (e.pointerType == 'mouse')
                    ha.input.event.move(ha.input.mouseGlobal, buffer, e);
            };
            buffer.canvas.onpointerout = (e) => {
                e.stopPropagation();
                let input = ha.input.baru(e.button + '', e.pointerType);
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                if (e.pointerType == 'touch')
                    ha.input.event.up(ha.input.touchGlobal);
                if (e.pointerType == 'mouse')
                    ha.input.event.up(ha.input.mouseGlobal);
            };
            buffer.canvas.onpointercancel = (e) => {
                e.stopPropagation();
                e.preventDefault();
            };
            buffer.canvas.onpointerup = (e) => {
                e.stopPropagation();
                let input = ha.input.baru(e.button + '', e.pointerType);
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                if (e.pointerType == 'touch')
                    ha.input.event.up(ha.input.touchGlobal);
                if (e.pointerType == 'mouse')
                    ha.input.event.up(ha.input.mouseGlobal);
            };
            window.onkeydown = (e) => {
                e.stopPropagation();
                let input = ha.input.baru(e.key + '', 'keyb');
                ha.input.event.down(input, e.key, 'keyb', ha.point.create());
                ha.input.event.down(this.inputGlobal, e.key, 'keyb', ha.point.create());
                ha.input.event.down(this._keybGlobal, e.key, 'keyb', ha.point.create());
                console.log('keydown');
            };
            window.onkeyup = (e) => {
                e.stopPropagation();
                let input = ha.input.baru(e.key + '', 'keyb');
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                ha.input.event.up(this._keybGlobal);
            };
        }
        def() {
            return {
                id: 0,
                isDown: false,
                isDrag: false,
                isTap: false,
                key: '',
                timerEnd: 0,
                timerStart: 0,
                type: '',
                x: 0,
                xDrag: 0,
                xStart: 0,
                y: 0,
                yDrag: 0,
                yStart: 0,
                hit: 0
            };
        }
        reset(input) {
            input.id = 0;
            input.isDown = false;
            input.isDrag = false;
            input.isTap = false;
            input.key = '';
            input.timerEnd = 0;
            input.timerStart = 0;
            input.type = '';
            input.x = 0;
            input.y = 0;
            input.xDrag = 0;
            input.yDrag = 0;
            input.xStart = 0;
            input.yStart = 0;
        }
        flush() {
            while (this.inputs.length > 0) {
                this.inputs.pop();
            }
            this.flushByInput(this._inputGlobal);
            this.flushByInput(this._mouseGlobal);
            this.flushByInput(this._touchGlobal);
            this.flushByInput(this._keybGlobal);
        }
        flushByType(type) {
            this._inputs.forEach((input) => {
                if (type == input.type) {
                    this.flushByInput(input);
                }
            });
        }
        flushByInput(input) {
            input.isDown = false;
            input.isDrag = false;
            input.isTap = false;
            input.hit = 0;
        }
        getInput(key, inputType) {
            let inputHasil;
            for (let i = 0; i < this.inputs.length; i++) {
                let input = this.inputs[i];
                if (input.type == inputType && input.key == key) {
                    inputHasil = input;
                    return inputHasil;
                }
            }
            return inputHasil;
        }
        baru(e, inputType) {
            let inputBaru = this.getInput(e, inputType);
            if (!inputBaru) {
                inputBaru = {
                    key: e,
                    type: inputType,
                    isDown: false,
                    isDrag: false,
                    isTap: false,
                    timerEnd: 0,
                    timerStart: 0,
                    x: 0,
                    xDrag: 0,
                    xStart: 0,
                    y: 0,
                    yDrag: 0,
                    yStart: 0,
                    id: 0,
                    hit: 0
                };
                this.inputs.push(inputBaru);
            }
            return inputBaru;
        }
        pos = (cx, cy, buffer, canvasScaleX, canvasScaleY) => {
            let rect = buffer.canvas.getBoundingClientRect();
            let poslx = Math.floor((cx - rect.x) / canvasScaleX);
            let posly = Math.floor((cy - rect.y) / canvasScaleY);
            return {
                x: poslx,
                y: posly
            };
        };
        get inputs() {
            return this._inputs;
        }
        get event() {
            return this._event;
        }
        get touchGlobal() {
            return this._touchGlobal;
        }
        get mouseGlobal() {
            return this._mouseGlobal;
        }
        get keybGlobal() {
            return this._keybGlobal;
        }
        get inputGlobal() {
            return this._inputGlobal;
        }
    }
    class Event {
        move(input, canvas, e) {
            let pos = ha.input.pos(e.clientX, e.clientY, canvas, canvas.scaleX, canvas.scaleY);
            input.x = pos.x;
            input.y = pos.y;
            input.id = e.pointerId;
            if (input.isDown) {
                input.isDrag = true;
                input.xDrag = input.x - input.xStart;
                input.yDrag = input.y - input.yStart;
            }
        }
        down(input, key, type, pos) {
            if (!input.isDown) {
                input.hit++;
            }
            input.xStart = pos.x;
            input.yStart = pos.y;
            input.x = pos.x;
            input.y = pos.y;
            input.isDown = true;
            input.isTap = false;
            input.isDrag = false;
            input.key = key;
            input.type = type;
            input.timerStart = Date.now();
        }
        up(input2) {
            input2.isDown = false;
            input2.isDrag = false;
            input2.timerEnd = Date.now();
            input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);
        }
    }
    ha.input = new Input();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Line {
        createLine(m, b) {
            return {
                b: b,
                m: m,
                y: 0
            };
        }
        fromPos() {
        }
        fromVec() {
        }
        fromSeg() {
        }
        lineCrossPos(line, line2) {
            line;
            line2;
            return null;
        }
    }
    ha.line = new Line();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Point {
        create(x = 0, y = 0) {
            return {
                x: x,
                y: y
            };
        }
        copyInfo(p1, p2) {
            p2.x = p1.x;
            p2.y = p1.y;
        }
        copy(p) {
            let h = this.create(p.x, p.y);
            return h;
        }
        equal(p1, p2) {
            if (false == ha.trans.equal(p1.x, p2.x))
                return false;
            if (false == ha.trans.equal(p1.y, p2.y))
                return false;
            return true;
        }
        translate(p, x = 0, y = 0) {
            p.x += x;
            p.y += y;
        }
        rotateRel(p, xc = 0, yc = 0, deg = 0) {
            ha.trans.rotateRel(p.x, p.y, xc, yc, deg);
            p.x = ha.trans.lastX;
            p.y = ha.trans.lastY;
        }
    }
    ha.point = new Point();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Rect {
        create(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
            let r = {};
            r.vs = [];
            r.vs.push(ha.point.create(x1, y1));
            r.vs.push(ha.point.create(x2, y1));
            r.vs.push(ha.point.create(x2, y2));
            r.vs.push(ha.point.create(x1, y2));
            r.segs = [];
            r.segs.push(ha.segment.createSeg(r.vs[0], r.vs[1]));
            r.segs.push(ha.segment.createSeg(r.vs[1], r.vs[2]));
            r.segs.push(ha.segment.createSeg(r.vs[2], r.vs[3]));
            r.segs.push(ha.segment.createSeg(r.vs[3], r.vs[0]));
            return r;
        }
        copy(r) {
            let hasil = this.create();
            this.copyInfo(r, hasil);
            return hasil;
        }
        copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                ha.segment.copyInfo(r1.segs[i], r2.segs[i]);
            }
        }
        collideBound(r1, r2) {
            if (this.maxX(r1) < this.minX(r2)) {
                return false;
            }
            if (this.minX(r1) > this.maxX(r2)) {
                return false;
            }
            if (this.maxY(r1) < this.minY(r2)) {
                return false;
            }
            if (this.minY(r1) > this.maxY(r2)) {
                return false;
            }
            return true;
        }
        collide(r1, r2) {
            let bound = this.collideBound(r1, r2);
            if (!bound)
                return false;
            for (let i = 0; i < r1.segs.length; i++) {
                for (let j = 0; j < r2.segs.length; j++) {
                    if (ha.segment.collide(r1.segs[i], r2.segs[j])) {
                        return true;
                    }
                }
            }
            return false;
        }
        collideDotBound(r, d) {
            if (d.x < this.minX(r)) {
                return false;
            }
            if (d.x > this.maxX(r)) {
                return false;
            }
            if (d.y < this.minY(r)) {
                return false;
            }
            if (d.y > this.maxY(r)) {
                return false;
            }
            return true;
        }
        collideDot(r, x, y) {
            let r2 = ha.rect.copy(r);
            let p = ha.point.create(x, y);
            let d = ha.segment.deg(r2.segs[0]);
            let pRot = r2.vs[0];
            if (!this.collideDotBound(r, p)) {
                return false;
            }
            ha.rect.rotate(r2, -d, pRot.x, pRot.y);
            ha.point.rotateRel(p, pRot.x, pRot.y, -d);
            if (!this.collideDotBound(r2, p)) {
                return false;
            }
            return true;
        }
        minX(r) {
            let x = r.vs[0].x;
            r.vs.forEach((item) => {
                if (item.x < x)
                    x = item.x;
            });
            return x;
        }
        maxX(r) {
            let x = r.vs[0].x;
            r.vs.forEach((item) => {
                if (item.x > x)
                    x = item.x;
            });
            return x;
        }
        minY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y < y)
                    y = item.y;
            });
            return y;
        }
        maxY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y > y)
                    y = item.y;
            });
            return y;
        }
        scale(r) {
            r;
        }
        translate(rect, x, y) {
            rect.vs.forEach((v) => {
                ha.point.translate(v, x, y);
            });
        }
        rotate(r, deg, xc = 0, yc) {
            r.vs.forEach((p) => {
                ha.point.rotateRel(p, xc, yc, deg);
            });
        }
    }
    ha.rect = new Rect();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Segment {
        createSeg(v1 = { x: 0, y: 0 }, v2 = { x: 0, y: 0 }) {
            return {
                v1: v1,
                v2: v2
            };
        }
        boundCollide(seg1, seg2) {
            if (this.maxX(seg1) < this.minX(seg2))
                return false;
            if (this.minX(seg1) > this.maxX(seg2))
                return false;
            if (this.maxY(seg1) < this.minY(seg2))
                return false;
            if (this.minY(seg1) > this.maxY(seg2))
                return false;
            return true;
        }
        collide(seg1, seg2) {
            let bound = this.boundCollide(seg1, seg2);
            if (!bound)
                return false;
            let seg2Copy = this.copy(seg2);
            let seg1Copy = this.copy(seg1);
            let deg = this.deg(seg2);
            this.rotate(seg2Copy, -deg, seg2.v1.x, seg2.v1.y);
            this.rotate(seg1Copy, -deg, seg2.v1.x, seg2.v1.y);
            if (!this.boundCollide(seg1Copy, seg2Copy))
                return false;
            this.translate(seg1Copy, -seg2.v1.x, -seg2.v1.y);
            this.translate(seg2Copy, -seg2.v1.x, -seg2.v1.y);
            if (!this.crossHor(seg1Copy)) {
                return false;
            }
            let idx = this.xHorIdx(seg1Copy);
            let x = this.getXAtIdx(seg1Copy, idx);
            if (x > this.maxX(seg2Copy))
                return false;
            if (x < this.minX(seg2Copy))
                return false;
            return true;
        }
        copyInfo(seg1, seg2) {
            ha.point.copyInfo(seg1.v1, seg2.v2);
            ha.point.copyInfo(seg1.v2, seg2.v2);
        }
        copy(seg) {
            return {
                v1: ha.point.copy(seg.v1),
                v2: ha.point.copy(seg.v2)
            };
        }
        crossHor(seg) {
            if (ha.segment.maxY(seg) > 0) {
                if (ha.segment.minY(seg) < 0) {
                    return true;
                }
            }
            return false;
        }
        deg(line) {
            let j = line.v2.y - line.v1.y;
            let i = line.v2.x - line.v1.x;
            return ha.trans.deg(i, j);
        }
        getXAtIdx(seg, idx) {
            return seg.v1.x + (idx * this.vecI(seg));
        }
        getYAtIdx(seg, idx) {
            return seg.v1.y + (idx * this.vecJ(seg));
        }
        vecI(seg) {
            return seg.v2.x - seg.v1.x;
        }
        vecJ(seg) {
            return seg.v2.y - seg.v1.y;
        }
        rotate(seg, deg = 0, xc = 0, yc = 0) {
            ha.point.rotateRel(seg.v1, xc, yc, deg);
            ha.point.rotateRel(seg.v2, xc, yc, deg);
        }
        minX(seg) {
            return Math.min(seg.v1.x, seg.v2.x);
        }
        maxX(seg) {
            return Math.max(seg.v1.x, seg.v2.x);
        }
        minY(seg) {
            return Math.min(seg.v1.y, seg.v2.y);
        }
        maxY(seg) {
            return Math.max(seg.v1.y, seg.v2.y);
        }
        translate(seg, x = 0, y = 0) {
            ha.point.translate(seg.v1, x, y);
            ha.point.translate(seg.v2, x, y);
        }
        xHorIdx(seg) {
            if (!ha.segment.crossHor(seg))
                return NaN;
            let idx = 0;
            idx = (0 - seg.v1.y) / (seg.v2.y - seg.v1.y);
            return idx;
        }
    }
    ha.segment = new Segment();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Transform {
        RAD2DEG = 180.0 / Math.PI;
        DEG2RAD = Math.PI / 180.0;
        _lastX = 0;
        _lastY = 0;
        get lastX() {
            return this._lastX;
        }
        get lastY() {
            return this._lastY;
        }
        create() {
            return {
                pos: { x: 0, y: 0 },
                scale: { x: 1, y: 1 },
                rotation: 0
            };
        }
        equal(n1, n2, tol = 1) {
            if (Math.abs(n1 - n2) <= tol)
                return true;
            return false;
        }
        quadDeg2(x, y, deg) {
            if (x == 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x > 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x < 0) {
                if (y == 0) {
                    return 180;
                }
                else if (y > 0) {
                    return 180 - Math.abs(deg);
                }
                else if (y < 0) {
                    return 180 + Math.abs(deg);
                }
            }
            throw Error();
        }
        deg(x, y) {
            let l;
            let s;
            l = Math.sqrt(x * x + y * y);
            if (l == 0) {
                l = .00001;
            }
            s = y / l;
            s = Math.asin(s);
            s *= this.RAD2DEG;
            s = ha.trans.quadDeg2(x, y, s);
            s = this.normalizeDeg(s);
            return s;
        }
        normalizeDeg(deg) {
            while (deg >= 360) {
                deg -= 360;
            }
            while (deg <= -360) {
                deg += 360;
            }
            if (deg < 0)
                deg = 360 + deg;
            return deg;
        }
        degMaxDist(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            let deg = this.degMinDist(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
        }
        degMinDist(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            if (angleT >= angleS) {
                if (angleT - angleS > 180) {
                    return -(angleS + 360 - angleT);
                }
                else {
                    return angleT - angleS;
                }
            }
            else {
                if (angleS - angleT >= 180) {
                    return 360 + angleT - angleS;
                }
                else {
                    return angleT - angleS;
                }
            }
        }
        dist(x, y, xt, yt) {
            let pjx = xt - x;
            let pjy = yt - y;
            return Math.sqrt(pjx * pjx + pjy * pjy);
        }
        rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            deg *= ha.trans.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            this._lastX = x1 + xt;
            this._lastY = y1 + yt;
        }
    }
    ha.trans = new Transform();
})(ha || (ha = {}));

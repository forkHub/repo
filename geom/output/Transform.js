export class Transform {
    static RAD2DEG = 180.0 / Math.PI;
    static DEG2RAD = Math.PI / 180.0;
    static _lastX = 0;
    static _lastY = 0;
    static get lastX() {
        return Transform._lastX;
    }
    static get lastY() {
        return Transform._lastY;
    }
    static equal(n1, n2, toleransi = 1) {
        if (Math.abs(n1 - n2) <= toleransi)
            return true;
        return false;
    }
    static quadDeg2(x, y, deg) {
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
    static deg(x, y) {
        let l;
        let sin;
        l = Math.sqrt(x * x + y * y);
        if (l == 0) {
            l = .00001;
        }
        sin = y / l;
        sin = Math.asin(sin);
        sin *= Transform.RAD2DEG;
        sin = Transform.quadDeg2(x, y, sin);
        sin = Transform.normalizeDeg(sin);
        return sin;
    }
    static normalizeDeg(deg) {
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
    static degDistMax(angleS = 0, angleT) {
        angleS = Transform.normalizeDeg(angleS);
        angleT = Transform.normalizeDeg(angleT);
        let deg = Transform.degDistMin(angleS, angleT);
        if (deg >= 0) {
            return -(360 - deg);
        }
        else {
            return (360 - Math.abs(deg));
        }
    }
    static degDistMin(angleS = 0, angleT) {
        angleS = Transform.normalizeDeg(angleS);
        angleT = Transform.normalizeDeg(angleT);
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
    static jarak(x, y, xt, yt) {
        let pjx = xt - x;
        let pjy = yt - y;
        return Math.sqrt(pjx * pjx + pjy * pjy);
    }
    static rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
        let xr = x - xt;
        let yr = y - yt;
        let x1;
        let y1;
        deg *= Transform.DEG2RAD;
        x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
        y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
        Transform._lastX = x1 + xt;
        Transform._lastY = y1 + yt;
    }
}
//# sourceMappingURL=Transform.js.map
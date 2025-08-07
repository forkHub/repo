/**
 * JS Wrapper for blockly
 */
var ha;
(function (ha) {
    var js;
    (function (js) {
        class List {
            static push(l, v) {
                l.push(v);
            }
            static pop(l) {
                return l.pop();
            }
        }
        js.List = List;
        class Grid {
            static create(w, h) {
                let hs = new Array(w);
                for (let i = 0; i < w; i++) {
                    hs[i] = new Array(h);
                }
                return hs;
            }
            static setV(g, x, y, v) {
                g[x][y] = v;
            }
            static getV(g, x, y) {
                return g[x][y];
            }
        }
        js.Grid = Grid;
    })(js = ha.js || (ha.js = {}));
})(ha || (ha = {}));

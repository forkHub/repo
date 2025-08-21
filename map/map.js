"use strict";
function map(n, a, b, c, d) {
    return ((n - c) / (d - c)) * (b - a) + a;
}
console.log(map(5, 10, 11, 0, 6));

function map(n: number, a: number, b: number, c: number, d: number) {

    return ((n - c) / (d - c)) * (b - a) + a;
}



console.log(map(5, 10, 11, 0, 6));

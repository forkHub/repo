let angka1 = Math.floor(Math.random() * 255);
let angka2 = Math.floor(Math.random() * 255);
let angka3 = Math.floor(Math.random() * 255);
let angkaH = [];
let bin1 = kanan('00000000' + angka1.toString(2));
let bin2 = kanan('00000000' + angka2.toString(2));
let bin3 = kanan('00000000' + angka3.toString(2));
console.log(bin1);
console.log(bin2);
console.log(bin3);
let bin = bin1 + bin2;
console.log(bin);
function kanan(str, pjg = 8) {
    return str.slice(str.length - pjg);
}
for (let i = 0; i < bin.length; i++) {
    let str = bin.slice(i, i + 8);
    if (str.length >= 8) {
        if (angkaH.indexOf(str) == -1) {
            console.log(str);
            angkaH.push(str);
        }
        else {
        }
    }
}
if (angkaH.indexOf(bin3) >= 0) {
    console.log('ada');
}
else {
    console.log('tidak ada');
}

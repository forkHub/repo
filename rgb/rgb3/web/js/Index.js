let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
const DEG2RAD = Math.PI / 180;
ctx.rect(0, 0, 100, 100);
ctx.beginPath();
ctx.moveTo(0, 50);
ctx.lineTo(700, 50);
ctx.stroke();
for (let sdt = 0; sdt <= 760; sdt++) {
    let sin = Math.sin(DEG2RAD * sdt) * 50 + 50;
    console.log('sdt ' + sdt + '/sin ' + sin);
    ctx.beginPath();
    ctx.rect(sdt, sin, 2, 2);
    ctx.stroke();
    sin = Math.sin(DEG2RAD * sdt + 90) * 50 + 50;
    ctx.beginPath();
    ctx.rect(sdt, sin, 2, 2);
    ctx.stroke();
    sin = Math.sin(DEG2RAD * sdt - 90) * 50 + 50;
    ctx.beginPath();
    ctx.rect(sdt, sin, 2, 2);
    ctx.stroke();
}

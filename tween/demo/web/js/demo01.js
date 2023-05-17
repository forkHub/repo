window.onload = () => {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    test();
    jump(10, 400, 110, 120, 210, 400, 30);
    function jump(sx, sy, tx, ty, dx, dy, step) {
        for (let i = 0; i <= step; i++) {
            let p2x;
            let t2x;
            let p2y;
            let t2y;
            t2y = tween(i / step, 2);
            p2y = sy - t2y * Math.abs(ty - sy);
            t2x = tween(i / step, 0);
            p2x = sx + t2x * Math.abs(tx - sx);
            ctx.fillRect(p2x, p2y, 2, 2);
        }
        for (let i = 0; i <= step; i++) {
            let p2x;
            let t2x;
            let p2y;
            let t2y;
            t2y = tween(i / step, 1);
            p2y = ty + t2y * Math.abs(ty - dy);
            t2x = tween(i / step, 0);
            p2x = tx + t2x * Math.abs(dx - tx);
            ctx.fillRect(p2x, p2y, 2, 2);
        }
    }
    function test() {
        let tmax = 20;
        let s = 280;
        for (let i = 0; i <= tmax; i++) {
            let px;
            let tx;
            //speeding up
            tx = tween(i / tmax, 1);
            px = 10 + tx * s;
            ctx.fillRect(px, 10, 2, 2);
            //slowing down
            tx = tween(i / tmax, 2);
            px = 10 + tx * s;
            ctx.fillRect(px, 40, 2, 2);
            //normal
            tx = tween(i / tmax, 0);
            px = 10 + tx * s;
            ctx.fillRect(px, 70, 2, 2);
        }
    }
    function tween(idx, mode) {
        if ((idx < 0) || (idx > 1))
            throw Error('idx should be 0 .. 1');
        if (0 == mode) {
            return idx;
        }
        else if (1 == mode) {
            return idx * idx;
        }
        else if (2 == mode) {
            return idx * (2 - idx);
        }
        else {
            throw Error('invalid mode (0, 1, 2)');
        }
    }
};
// function lompat() {
// 	let an: ha.tw.TweenObj = new ha.tw.Animasi();
// 	an.frames.push(new ha.tw.Frame(10, 50, 0));
// 	for (let i: number = 0; i < 50; i++) {
// 	}
// }

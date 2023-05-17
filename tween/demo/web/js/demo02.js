window.onload = () => {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let tween = ha.tw.tween;
    let tmax = 100;
    //1. tween A
    for (let i = 0; i <= tmax; i++) {
        let px;
        let tx;
        //test tween A
        tx = tween.tween(i / tmax, 1);
        px = 50 + tx * 500;
        ctx.fillRect(px, 10, 1, 2);
    }
    //2. TWEEN B
    for (let i = 0; i <= tmax; i++) {
        let px;
        let tx;
        tx = tween.tweenB(500, i / tmax, 1);
        px = 50 + tx;
        ctx.fillRect(px, 20, 1, 2);
    }
    //3. TWEEN BA
    for (let i = 0; i <= tmax; i++) {
        let px;
        let tx;
        tx = tween.tweenBA(50, 550, i / tmax, 1);
        px = tx;
        ctx.fillRect(px, 30, 1, 2);
    }
    //4. TWEEN BC
    for (let i = 10; i <= 110; i++) {
        let px;
        let tx;
        tx = tween.tweenBC(50, 550, i, 10, 110, 1);
        px = tx;
        ctx.fillRect(px, 40, 1, 2);
    }
    //5. TWEEN BB
    for (let i = 0; i <= tmax; i++) {
        let px;
        let tx;
        tx = tween.tweenBB(50, 550, i, 100, 1);
        px = tx;
        ctx.fillRect(px, 50, 1, 2);
    }
    //6. tween obj
    let twObj = new ha.tw.TweenObj();
    twObj.tambahFrame(new ha.tw.Frame(50, 200, 1));
    twObj.tambahFrame(new ha.tw.Frame(100, 550, 1));
    twObj.frameList.bacaByPos(0).nilai = 50;
    for (let i = 0; i <= 100; i++) {
        let px;
        let tx;
        tx = twObj.nilai(i);
        console.log(tx);
        px = tx;
        ctx.fillRect(px, 60, 1, 2);
    }
};

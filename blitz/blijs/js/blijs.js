var ha_blijs;
(function (ha_blijs) {
    class Blijs {
        init(canvas) {
            ha_blitz.main.init(canvas, canvas);
            ha.input.init(ha_blitz.main.canvasAktif);
            window.onresize = async () => {
                this.windowResize();
            };
            setTimeout(() => {
                this.windowResize();
            }, 100);
            let _window = window;
            setTimeout(() => {
                if (typeof _window.Start == "function") {
                    console.log('window start function called');
                    _window.Start()
                        .then(() => {
                        this.repeat();
                    })
                        .catch((e) => {
                        console.error(e);
                    });
                }
                else {
                    console.warn('start not found');
                    this.repeat();
                }
            }, 0);
        }
        loop = async () => {
            let _window = window;
            if (typeof _window.Loop == 'function') {
                await _window.Loop();
            }
            else if (typeof _window.loop == 'function') {
                await _window.loop();
            }
        };
        repeat = () => {
            this.loop()
                .then(() => {
                setTimeout(() => {
                    requestAnimationFrame(this.repeat);
                }, 0);
            }).
                catch((e) => {
                console.error(e);
            });
        };
        windowResize = () => {
            let canvas = ha_blitz.main.canvasAktif.canvas;
            let cp = ha_blitz.main.canvasAktif.canvas.width;
            let cl = ha_blitz.main.canvasAktif.canvas.height;
            let wp = window.innerWidth;
            let wl = window.innerHeight;
            let ratio = Math.min((wp / cp), (wl / cl));
            let cp2 = Math.floor(cp * ratio);
            let cl2 = Math.floor(cl * ratio);
            ha_blitz.main.canvasAktif.scaleX = ratio;
            ha_blitz.main.canvasAktif.scaleY = ratio;
            canvas.style.width = cp2 + 'px';
            canvas.style.height = cl2 + 'px';
            canvas.style.top = ((wl - cl2) / 2) + 'px';
            canvas.style.left = ((wp - cp2) / 2) + 'px';
        };
    }
    ha_blijs.blijs = new Blijs();
})(ha_blijs || (ha_blijs = {}));
window.onload = () => {
    console.log('window onload:');
    let canvas = document.body.querySelector('canvas');
    ha_blijs.blijs.init(canvas);
};

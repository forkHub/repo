var ha;
(function (ha) {
    var blijs;
    (function (blijs_1) {
        class Blijs {
            init(canvas) {
                ha.blitz.main.init(canvas, canvas);
                ha.input.init(ha.blitz.main.canvasAktif);
                window.onresize = async () => {
                    this.windowResize();
                };
                this.windowResize();
                let _window = window;
                setTimeout(() => {
                    if (typeof _window.Start == "function") {
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
            };
            repeat = () => {
                this.loop()
                    .then(() => {
                    setTimeout(() => {
                        requestAnimationFrame(this.repeat);
                    }, ha.blitz.main.fps);
                }).
                    catch((e) => {
                    console.error(e);
                });
            };
            windowResize = () => {
                let canvas = ha.blitz.main.canvasAktif.canvas;
                let cp = ha.blitz.main.canvasAktif.canvas.width;
                let cl = ha.blitz.main.canvasAktif.canvas.height;
                let wp = window.innerWidth;
                let wl = window.innerHeight;
                let ratio = Math.min((wp / cp), (wl / cl));
                let cp2 = Math.floor(cp * ratio);
                let cl2 = Math.floor(cl * ratio);
                ha.blitz.main.canvasAktif.scaleX = ratio;
                ha.blitz.main.canvasAktif.scaleY = ratio;
                canvas.style.width = cp2 + 'px';
                canvas.style.height = cl2 + 'px';
                canvas.style.top = ((wl - cl2) / 2) + 'px';
                canvas.style.left = ((wp - cp2) / 2) + 'px';
            };
        }
        blijs_1.blijs = new Blijs();
    })(blijs = ha.blijs || (ha.blijs = {}));
})(ha || (ha = {}));
window.onload = () => {
    let canvas = document.body.querySelector('canvas');
    ha.blijs.blijs.init(canvas);
    window.onresize = async () => {
        ha.blijs.blijs.windowResize();
    };
    ha.blijs.blijs.windowResize();
    let _window = window;
    setTimeout(() => {
        if (typeof _window.Start == "function") {
            _window.Start()
                .then(() => {
                ha.blijs.blijs.repeat();
            })
                .catch((e) => {
                console.error(e);
            });
        }
        else {
            console.warn('start not found');
            ha.blijs.blijs.repeat();
        }
    }, 0);
};

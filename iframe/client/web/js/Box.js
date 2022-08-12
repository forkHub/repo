let log = [];
const M_IDLE = 'idle';
const M_PENCET = 'pencet';
const M_GERAK = 'gerak';
const M_DRAG = 'drag';
const M_TAP = 'tap';
let mState = M_IDLE;
let mPencetX = 0;
let mPencetY = 0;
let mDragX = 0;
let mDragY = 0;
let clientX = 0;
function debug(msg) {
    log = [];
    ha.comp.Util.getEl('div.debug').innerHTML = msg;
}
function debugTambah(msg) {
    log.push(msg);
    let str = '';
    log.forEach((item) => {
        str += item + '<br/>';
    });
    ha.comp.Util.getEl('div.debug').innerHTML = str;
}
window.onpointerdown = (e) => {
    mState = M_PENCET;
    mPencetX = e.clientX;
    mPencetY = e.clientY;
};
window.onpointermove = (e) => {
    if (mState == M_PENCET) {
        mDragX = e.clientX - mPencetX;
        mDragY = e.clientY - mPencetY;
        let p = (Math.abs(mDragX) + Math.abs(mDragY));
        if (p > 5) {
            mState = M_DRAG;
            clientX = e.clientX;
        }
    }
    else if (mState == M_DRAG) {
        mDragX = e.clientX - mPencetX;
        mDragY = e.clientY - mPencetY;
        clientX = e.clientX;
    }
    else if (mState == M_IDLE) {
        mState = M_GERAK;
    }
};
window.onpointerleave = () => {
    mState = M_IDLE;
};
window.onpointerenter = () => {
    mState = M_IDLE;
};
window.onpointerover = () => {
};
window.onpointerup = () => {
    if (mState == M_DRAG) {
        mState = M_IDLE;
    }
    else if (mState == M_PENCET) {
        mState = M_TAP;
    }
};
window.onload = () => {
    setInterval(() => {
        debug('');
        debugTambah('m state: ' + mState);
        debugTambah('m drag, x: ' + mDragX + '/y: ' + mDragY);
        debugTambah('client, x: ' + clientX);
    }, 100);
};

let log: string[] = [];

const M_IDLE: string = 'idle';
const M_PENCET: string = 'pencet';
const M_GERAK: string = 'gerak';
const M_DRAG: string = 'drag';
const M_TAP: string = 'tap';

let mState: string = M_IDLE;
let mPencetX: number = 0;
let mPencetY: number = 0;
let mDragX: number = 0;
let mDragY: number = 0;
let clientX: number = 0;

function debug(msg: string): void {
	log = [];
	ha.comp.Util.getEl('div.debug').innerHTML = msg;
}

function debugTambah(msg: string): void {
	log.push(msg);

	let str: string = '';

	log.forEach((item: string) => {
		str += item + '<br/>'
	})

	ha.comp.Util.getEl('div.debug').innerHTML = str;
}

window.onpointerdown = (e: PointerEvent) => {
	mState = M_PENCET;
	mPencetX = e.clientX;
	mPencetY = e.clientY;
}

window.onpointermove = (e: PointerEvent) => {
	if (mState == M_PENCET) {
		mDragX = e.clientX - mPencetX;
		mDragY = e.clientY - mPencetY;
		let p: number = (Math.abs(mDragX) + Math.abs(mDragY));

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
}

window.onpointerleave = () => {
	mState = M_IDLE;
}

window.onpointerenter = () => {
	mState = M_IDLE;
}

window.onpointerover = () => {

}

window.onpointerup = () => {
	if (mState == M_DRAG) {
		mState = M_IDLE;
	}
	else if (mState == M_PENCET) {
		mState = M_TAP;
	}
}

window.onload = () => {
	setInterval(() => {
		debug('');
		debugTambah('m state: ' + mState);
		debugTambah('m drag, x: ' + mDragX + '/y: ' + mDragY);
		debugTambah('client, x: ' + clientX);
	}, 100);
}
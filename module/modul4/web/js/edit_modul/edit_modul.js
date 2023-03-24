export function getParam(key) {
    let s = window.top.location.search;
    let kv = [];
    if (s) {
        kv = s.split('&');
    }
    for (let i = 0; i < kv.length; i++) {
        let ar;
        ar = kv[i].split('=');
        if (ar[0] == key)
            return ar[1];
    }
    return null;
}

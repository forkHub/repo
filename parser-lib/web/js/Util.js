var ha;
(function (ha) {
    var parse;
    (function (parse) {
        function pushCadangan(kata) {
            kata.forEach((item) => {
                ha.parse.parser.kataCadangan.push(item);
            });
        }
        parse.pushCadangan = pushCadangan;
        async function load(file) {
            return await ha.comp.Util.Ajax2('get', file, '');
        }
        parse.load = load;
        let debugStatus;
        function debugOn() {
            debugStatus = true;
        }
        parse.debugOn = debugOn;
        function debugOff() {
            debugStatus = false;
        }
        parse.debugOff = debugOff;
        function debugLog(msg, status = false) {
            if (debugStatus || status) {
                console.log(msg);
            }
        }
        parse.debugLog = debugLog;
        function debugGroupCollapsed(msg, status = false) {
            if (debugStatus || status) {
                console.groupCollapsed(msg);
            }
        }
        parse.debugGroupCollapsed = debugGroupCollapsed;
        function debugGroup(msg, status = false) {
            if (debugStatus || status) {
                console.group(msg);
            }
        }
        parse.debugGroup = debugGroup;
        function debugGroupEnd(status = false) {
            if (debugStatus || status) {
                console.groupEnd();
            }
        }
        parse.debugGroupEnd = debugGroupEnd;
        function renderToken(token) {
            let hasil = '';
            token.forEach((item) => {
                hasil += item.nama;
                hasil += ' ';
            });
            return hasil;
        }
        parse.renderToken = renderToken;
        function pushRumus(rumusAr) {
            console.log('rumusAr ' + rumusAr);
            rumusAr.forEach((item) => {
                parse.grammarAr.push(item);
            });
        }
        parse.pushRumus = pushRumus;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));

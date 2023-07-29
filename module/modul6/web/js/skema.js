export var EType;
(function (EType) {
    EType["projek"] = "projek";
    EType["modul"] = "modul";
    EType["stmt"] = "stmt";
    EType["exp"] = "exp";
    EType["var"] = "var";
})(EType || (EType = {}));
export var EStmtType;
(function (EStmtType) {
    EStmtType["funcDec"] = "func_dec";
    EStmtType["varDec"] = "var_dec";
})(EStmtType || (EStmtType = {}));
export var EExpType;
(function (EExpType) {
    EExpType["angka"] = "angka";
    EExpType["text"] = "text";
})(EExpType || (EExpType = {}));

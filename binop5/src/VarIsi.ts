class VarIsi {
    readonly daftar: IVarIsi[] = [];

    static varRef(obj: IVarIsi, value: number) {
        ha.comp.Util.stackTrace();
        obj.refVarId = value;
    }
}
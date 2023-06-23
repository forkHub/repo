let _base = 0;
export const id = () => {
    if (_base <= 0) {
        _base = Date.now();
    }
    _base++;
    return _base;
};

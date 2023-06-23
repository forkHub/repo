let _base: number = 0;

export const id = (): number => {
	if (_base <= 0) {
		_base = Date.now();
	}

	_base++;
	return _base;
}

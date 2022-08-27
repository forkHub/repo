interface IState {
	id: number,
	nama: string,
	trans: string[]
}

interface ITombol {
	label: string;
	view: HTMLButtonElement;
}

interface IPoint {
	x: number,
	y: number
}

interface IDot {
	id: number,
	pos: IPoint,
	indukId: number,
	skala: IPoint,
	rotasi: number

	//tambahan
	posGlobal: IPoint;
	skalaGlobal: IPoint;
	rotasiGlobal: number;
}

interface IPoligon {
	id: number;
	dot: number[];
}

interface IBound {
	p1: IPoint,
	p2: IPoint
}
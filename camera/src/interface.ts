interface ITombol {
	x: number,
	y: number,
	img?: IBuffer,
	url: string,
	target: string,
	geser: number
}

interface IGbr {
	x: number,
	img?: IBuffer
	url: string,
}

interface ISpot {
	gbr: IGbr,
	tbl: ITombol[]
}
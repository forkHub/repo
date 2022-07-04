interface ITombol {
	x: number,
	y: number,
	// dragX: number,
	img: IBuffer,
	url: string,
	target: string,
	geser: number
}

interface IGbr {
	x: number,
	y: number,
	// startX: number,
	// dragY: number,
	img: IBuffer
	url: string,
}

interface ISpot {
	img: IGbr,
	tbl: ITombol[]
}
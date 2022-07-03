interface ITombol {
	x: number,
	y: number,
	dragX: number,
	img: IBuffer,
	url: string,
	target: string
}

interface IGbr {
	x: number,
	y: number,
	dragX: number,
	// dragY: number,
	img: IBuffer
	url: string,
}

interface ISpot {
	img: IGbr,
	tbl: ITombol[]
}